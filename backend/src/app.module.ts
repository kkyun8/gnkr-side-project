import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedModule } from 'src/feed/feed.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    FeedModule,
    UserModule,
    TagsModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
