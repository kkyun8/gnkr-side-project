import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Feed } from 'src/feed/feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Follows } from 'src/user/follows.entity';
import { UserFavoriteFeed } from './UserFavoriteFeed.entity';
import { FeedPaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { FeedDto } from 'src/dto/feed';

const setFavorited = async (
  user: User,
  feedRepository: Repository<Feed>,
  userFavoriteFeedRepository: Repository<UserFavoriteFeed>,
  id: number,
) => {
  const feed = await feedRepository
    .createQueryBuilder('feed')
    .where('feed.id = :id', { id })
    .leftJoinAndSelect('feed.tags', 'tag')
    .innerJoinAndSelect('feed.user', 'user')
    .leftJoin('feed.favorite', 'favorite')
    .loadRelationCountAndMap('feed.favoriteCount', 'feed.favorite')
    .getOne();

  const favorite = await userFavoriteFeedRepository
    .createQueryBuilder('userFavoriteFeedRepository')
    .where('userId = :userId', { userId: user.id })
    .andWhere('feedId = :feedId', { feedId: id })
    .getOne();

  feed.isFavorited = favorite ? true : false;
  return feed;
};

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
    @InjectRepository(Follows)
    private readonly followsRepository: Repository<Follows>,
    @InjectRepository(UserFavoriteFeed)
    private readonly userFavoriteFeedRepository: Repository<UserFavoriteFeed>,
  ) {}

  async readFeedList(
    feedPaginationDto: FeedPaginationDto,
    user: { userId: number; email: string },
  ): Promise<FeedPaginated> {
    const skippedItems = (feedPaginationDto.page - 1) * feedPaginationDto.limit;
    const { page, limit, tagId, userId } = feedPaginationDto;
    const loginId = user.userId;

    const count = this.feedRepository
      .createQueryBuilder('feed')
      .select('COUNT(feed.id)', 'count');

    const feed = this.feedRepository
      .createQueryBuilder('feed')
      .orderBy('feed.id', 'DESC')
      .offset(skippedItems)
      .limit(limit);

    feed.loadRelationCountAndMap('feed.favoriteCount', 'feed.favorite');

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

    let data = await feed.getMany();

    if (loginId != 0) {
      const loginUser = await this.userRepository.findOne(loginId);

      if (loginUser) {
        const feedIds = data.map((f) => f.id);
        const favorite = await this.userFavoriteFeedRepository
          .createQueryBuilder('userFavoriteFeedRepository')
          .where('userId = :userId', { userId: loginUser.id })
          .andWhere('feedId IN (:...feedIds)', { feedIds })
          .getMany();

        const favoriteFeedIds = favorite.map((f) => f.feedId);
        data = data.map(
          (f) => ((f.isFavorited = favoriteFeedIds.includes(f.id)), f),
        );
      }
    }

    return {
      totalCount,
      page,
      limit,
      tagId,
      userId,
      data,
    };
  }

  async readFeed(id: number, loginId: number) {
    const feed = await this.feedRepository
      .createQueryBuilder('feed')
      .where('feed.id = :id', { id })
      .leftJoinAndSelect('feed.tags', 'tag')
      .innerJoinAndSelect('feed.user', 'user')
      .leftJoin('feed.favorite', 'favorite')
      .loadRelationCountAndMap('feed.favoriteCount', 'feed.favorite')
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

    if (loginId != 0) {
      const loginUser = await this.userRepository.findOne(loginId);
      const userId = loginUser.id;

      const favorite = await this.userFavoriteFeedRepository
        .createQueryBuilder('userFavoriteFeedRepository')
        .where('userId = :userId', { userId })
        .andWhere('feedId = :feedId', { feedId })
        .getOne();

      feed.isFavorited = favorite ? true : false;

      const followerId = loginUser.id;
      const followingId = feed.user.id;

      const follow = await this.followsRepository.findOne({
        where: { followerId, followingId },
      });

      const isFollowing = follow ? true : false;
      feed.user.isFollowing = isFollowing;
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

    const userId = user.id;
    const feedId = id;
    const favorite = await this.userFavoriteFeedRepository.insert({
      userId,
      feedId,
    });

    const feed = await setFavorited(
      user,
      this.feedRepository,
      this.userFavoriteFeedRepository,
      id,
    );

    return feed;
  }

  async unfavorite(id: number, loginId: number) {
    const user = await this.userRepository.findOne(loginId);

    const userId = user.id;
    const feedId = id;
    const favorite = await this.userFavoriteFeedRepository.delete({
      userId,
      feedId,
    });

    const feed = await setFavorited(
      user,
      this.feedRepository,
      this.userFavoriteFeedRepository,
      id,
    );

    return feed;
  }
}
