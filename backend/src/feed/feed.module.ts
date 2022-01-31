import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity';
import { Follows } from 'src/user/follows.entity';
import { UserFavoriteFeed } from './userFavoriteFeed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Feed,
      Tag,
      User,
      Comment,
      Follows,
      UserFavoriteFeed,
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
