import { ApiProperty } from '@nestjs/swagger';
import { Feed } from 'src/feed/feed.entity';

export class PaginationDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  tagId: number;
  @ApiProperty()
  isFavorite: 'true' | 'false';
}

export class FeedPaginationDto extends PaginationDto {
  @ApiProperty({
    description: 'TagでFeedを検索する場合にtagId指定',
    default: 0,
  })
  tagId: number;
  @ApiProperty({
    description: 'UserでFeedを検索する場合にuserId指定',
    default: 0,
  })
  userId: number;
}

export class PaginatedResultDto {
  readonly page: number;
  readonly limit: number;
  readonly totalCount: number;
}

export class FeedPaginatedResultDto extends PaginatedResultDto {
  readonly tagId: number;
  readonly userId: number;
  readonly isFavorite: boolean;
}

export class FeedPaginated extends FeedPaginatedResultDto {
  data: Feed[];
}
