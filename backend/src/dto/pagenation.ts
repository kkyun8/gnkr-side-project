import { ApiProperty } from '@nestjs/swagger';
import { Feed } from 'src/feed/feed.entity';

export class PaginationDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  tagId: number;
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
  @ApiProperty({
    description: 'loginIdが存在する場合FeedのisFavorited取得',
    default: 0,
  })
  loginId: number;
}

export class PaginatedResultDto {
  readonly page: number;
  readonly limit: number;
  readonly totalCount: number;
}

export class FeedPaginatedResultDto extends PaginatedResultDto {
  readonly tagId: number;
  readonly userId: number;
  readonly loginId: number;
}

export class FeedPaginated extends FeedPaginatedResultDto {
  data: Feed[];
}
