import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentDto } from 'src/dto/comment';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, getLoginId } from 'src/auth/jwt-auth.guard';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateComment(
    @Request() req,
    @Param('id') id: number | null,
    @Body() data: CommentDto,
  ) {
    const loginId = getLoginId(req);
    return this.service.updateComment(id, data, loginId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteComment(@Request() req, @Param('id') id) {
    const loginId = getLoginId(req);
    return this.service.deleteComment(id, loginId);
  }
}
