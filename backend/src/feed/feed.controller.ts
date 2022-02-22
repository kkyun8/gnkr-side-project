import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Query,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedPaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { FeedDto } from 'src/dto/feed';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { JwtAuthGuard, getLoginId } from 'src/auth/jwt-auth.guard';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  readFeedList(
    @Request() req,
    @Query() feedPaginationDto: FeedPaginationDto,
  ): Promise<FeedPaginated> {
    const loginId = getLoginId(req);
    feedPaginationDto.page = Number(feedPaginationDto.page);
    feedPaginationDto.limit = Number(feedPaginationDto.limit);
    feedPaginationDto.tagId = Number(feedPaginationDto.tagId);
    feedPaginationDto.userId = Number(feedPaginationDto.userId);

    return this.service.readFeedList(feedPaginationDto, loginId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  readFeed(@Request() req, @Param('id') id: number) {
    const loginId = getLoginId(req);

    return this.service.readFeed(id, loginId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createFeed(@Request() req, @Body() data: FeedDto) {
    return this.service.createFeed(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateFeed(@Request() req, @Param('id') id: number, @Body() data: FeedDto) {
    return this.service.updateFeed(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteFeed(@Request() req, @Param('id') id: number) {
    return this.service.deleteFeed(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/favorite')
  favoriteFeed(@Request() req, @Param('id') id: number) {
    const loginId = getLoginId(req);

    return this.service.favorite(id, loginId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/favorite')
  unFavoriteFeed(@Request() req, @Param('id') id: number) {
    const loginId = getLoginId(req);

    return this.service.unfavorite(id, loginId);
  }
}
