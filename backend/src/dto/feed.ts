import { ApiProperty } from '@nestjs/swagger';

export class FeedDto {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly body: string;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly tagList: string[];
}
