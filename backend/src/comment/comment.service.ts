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

  createComment(data: CommentDto) {
    const comment = new Comment();
    comment.body = data.body;
    comment.userId = data.userId;
    comment.feedId = data.feedId;
    return this.commentRepository.insert(comment);
  }

  async updateComment(id: number, data: CommentDto) {
    const comment = await this.commentRepository.findOne({ id });
    const updated = Object.assign(comment, data);

    return this.commentRepository.save(updated);
  }

  deleteComment(id: number) {
    return this.commentRepository.delete({ id });
  }
}
