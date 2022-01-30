import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Tag } from 'src/tags/tag.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column('text')
  body: string;

  @Column()
  userId: number;

  @ManyToOne((type) => User, (user) => user.feed, {
    nullable: false,
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToMany((type) => Tag, (tag) => tag.feed, {
    cascade: true,
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tags: Tag[];

  @OneToMany((type) => Comment, (comment) => comment.feed, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  comment: Comment[];

  @ManyToMany((type) => User, (user) => user.favorite, {
    onDelete: 'CASCADE',
  })
  favorite: User[];

  isFavorited: boolean;
  favoriteCount: number;

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
