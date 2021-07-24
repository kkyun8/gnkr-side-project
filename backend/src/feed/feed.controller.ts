import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedPaginationDto, FeedPaginated } from 'src/dto/pagenation';
import { FeedDto } from 'src/dto/feed';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly service: FeedService) {}

  @Get()
  readFeedList(
    @Query() feedPaginationDto: FeedPaginationDto,
  ): Promise<FeedPaginated> {
    feedPaginationDto.page = Number(feedPaginationDto.page);
    feedPaginationDto.limit = Number(feedPaginationDto.limit);
    feedPaginationDto.tagId = Number(feedPaginationDto.tagId);
    feedPaginationDto.userId = Number(feedPaginationDto.userId);

    return this.service.readFeedList(feedPaginationDto);
  }

  @Get(':id')
  readFeed(@Param('id') id) {
    return this.service.readFeed(id);
  }

  @Post()
  createFeed(@Body() data: FeedDto) {
    return this.service.createFeed(data);
  }

  @Put(':id')
  updateFeed(@Param('id') id: number, @Body() data: FeedDto) {
    return this.service.updateFeed(id, data);
  }

  @Delete(':id')
  deleteFeed(@Param('id') id: number) {
    return this.service.deleteFeed(id);
  }

  @Post(':id/favorite/:loginId')
  favoriteFeed(@Param('id') id: number, @Param('loginId') loginId: number) {
    return this.service.favorite(id, loginId);
  }

  @Delete(':id/favorite/:loginId')
  unFavoriteFeed(@Param('id') id: number, @Param('loginId') loginId: number) {
    return this.service.unfavorite(id, loginId);
  }
}
