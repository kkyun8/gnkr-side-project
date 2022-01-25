import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty()
  readonly body: string;
  @ApiProperty()
  readonly userId: number;
  @ApiProperty()
  readonly feedId: number;
}
