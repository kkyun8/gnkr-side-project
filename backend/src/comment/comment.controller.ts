import { Controller, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentDto } from 'src/dto/comment';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  createComment(@Body() data: CommentDto) {
    return this.service.createComment(data);
  }

  @Put(':id')
  updateComment(@Param('id') id: number, @Body() data: CommentDto) {
    return this.service.updateComment(id, data);
  }

  @Delete(':id')
  deleteComment(@Param('id') id) {
    return this.service.deleteComment(id);
  }
}
