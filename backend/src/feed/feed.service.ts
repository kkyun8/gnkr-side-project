import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from 'src/feed/feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/user/user.entity';
import { FeedPaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { FeedDto } from 'src/dto/feed';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async readFeedList(
    feedPaginationDto: FeedPaginationDto,
  ): Promise<FeedPaginated> {
    const skippedItems = (feedPaginationDto.page - 1) * feedPaginationDto.limit;
    const { page, limit, tagId } = feedPaginationDto;

    let totalCount;
    let data;

    if (!tagId) {
      totalCount = await this.feedRepository.count();

      data = await this.feedRepository
        .createQueryBuilder('feed')
        .orderBy('feed.id', 'DESC')
        .offset(skippedItems)
        .limit(limit)
        .leftJoinAndSelect('feed.tags', 'tag')
        .getMany();
    } else {
      totalCount = await this.feedRepository
        .createQueryBuilder('feed')
        .select('COUNT(feed.id)', 'count')
        .innerJoinAndSelect('feed.tags', 'tag')
        .where('tag.id = :tagId', { tagId })
        .getCount();

      data = await this.feedRepository
        .createQueryBuilder('feed')
        .orderBy('feed.id', 'DESC')
        .offset(skippedItems)
        .limit(limit)
        .innerJoinAndSelect('feed.tags', 'tag')
        .where('tag.id = :tagId', { tagId })
        .getMany();
    }

    return {
      totalCount,
      page,
      limit,
      data,
    };
  }

  readFeed(id: number) {
    return this.feedRepository.findOne({ id });
  }

  async createFeed(data: FeedDto) {
    const { title, body, userId } = data;
    const tags = await this.tagRepository.findByIds(data.tagIds);
    const feed = new Feed();

    feed.title = title;
    feed.body = body;
    feed.userId = userId;
    feed.tags = tags;

    return this.feedRepository.save(feed);
  }

  async updateFeed(id: number, data: FeedDto) {
    const tags = await this.tagRepository.findByIds(data.tagIds);
    const feed = await this.feedRepository.findOne(id);
    feed.tags = tags;

    const updated = Object.assign(feed, data);

    return this.feedRepository.save(updated);
  }

  deleteFeed(id: number) {
    return this.feedRepository.delete({ id });
  }

  async favorite(id: number, loginId: number) {
    const user = await this.userRepository.findOne(loginId);
    const favoriteFeedIds = user.favoriteFeedIds.slice();
    favoriteFeedIds.push(id);

    const feed = await this.feedRepository.findByIds(favoriteFeedIds);
    user.favorite = feed;

    await this.userRepository.save(user);
    return;
  }

  async unfavorite(id: number, loginId: number) {
    const user = await this.userRepository.findOne(loginId);
    const favoriteFeedIds = user.favoriteFeedIds.filter((f) => f != id);

    const feed = await this.feedRepository.findByIds(favoriteFeedIds);
    user.favorite = feed;

    await this.userRepository.save(user);
    return;
  }
}
