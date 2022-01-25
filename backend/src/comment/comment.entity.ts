import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { Feed } from 'src/feed/feed.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  body: string;

  @Column()
  userId: number;
  @Column()
  feedId: number;

  @ManyToOne(() => Feed, (feed) => feed.comment, {
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  feed: Feed;

  @ManyToOne(() => User, (user) => user.comment, {
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  user: User;

  //  TODO: mysqlに変更する場合、datetime -> timestampに変更
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
