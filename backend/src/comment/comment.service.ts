import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from 'src/dto/comment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async updateComment(id: number, data: CommentDto, loginId: number) {
    const { body, feedId } = data;
    let updated = new Comment();
    updated.body = body;
    updated.feedId = feedId;
    updated.userId = loginId;

    if (id != 0) {
      const comment = await this.commentRepository.findOne({ id });
      updated = Object.assign(comment, data);
    }

    return this.commentRepository.save(updated);
  }

  deleteComment(id: number, loginId: number) {
    return this.commentRepository.delete({ id });
  }
}
