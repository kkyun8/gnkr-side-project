import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feed, Tag, User])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
