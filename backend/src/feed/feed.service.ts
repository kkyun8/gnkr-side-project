import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from 'src/feed/feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
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
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async readFeedList(
    feedPaginationDto: FeedPaginationDto,
  ): Promise<FeedPaginated> {
    const skippedItems = (feedPaginationDto.page - 1) * feedPaginationDto.limit;
    const { page, limit, tagId, userId } = feedPaginationDto;

    const count = this.feedRepository
      .createQueryBuilder('feed')
      .select('COUNT(feed.id)', 'count');

    const feed = this.feedRepository
      .createQueryBuilder('feed')
      .orderBy('feed.id', 'DESC')
      .offset(skippedItems)
      .limit(limit);

    if (!tagId && !userId) {
      feed
        .leftJoinAndSelect('feed.tags', 'tag')
        .leftJoinAndSelect('feed.user', 'user');
    } else {
      if (tagId) {
        feed
          .innerJoinAndSelect('feed.tags', 'tag')
          .where('tag.id = :tagId', { tagId });

        count
          .innerJoinAndSelect('feed.tags', 'tag')
          .where('tag.id = :tagId', { tagId });
      }

      if (userId) {
        feed
          .innerJoinAndSelect('feed.user', 'user')
          .where('user.id = :userId', { userId });

        count
          .innerJoinAndSelect('feed.user', 'user')
          .where('user.id = :userId', { userId });
      }
    }

    const totalCount = await count.getCount();

    const data = await feed.getMany();

    return {
      totalCount,
      page,
      limit,
      tagId,
      userId,
      data,
    };
  }

  async readFeed(id: number) {
    const feed = await this.feedRepository
      .createQueryBuilder('feed')
      .where('feed.id = :id', { id })
      .leftJoinAndSelect('feed.tags', 'tag')
      .innerJoinAndSelect('feed.user', 'user')
      .getOne();

    // TODO: error
    if (!feed) return;

    const feedId = feed.id;

    // TODO: pagenation
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .innerJoinAndSelect('comment.user', 'user')
      .where('comment.feedId = :feedId', { feedId })
      .orderBy('comment.createdAt')
      .getMany();

    if (comments.length > 0) {
      feed.comment = comments;
    }

    return feed;
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
