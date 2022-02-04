import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Feed } from 'src/feed/feed.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'blob',
    nullable: true,
  })
  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany((type) => Feed, (feed) => feed.user, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  feed: Feed[];

  @OneToMany((type) => Comment, (comment) => comment.user, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  comment: Comment[];

  @Exclude()
  @ManyToMany((type) => Feed, (feed) => feed.favorite, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  favorite: Feed[];

  isFollower: boolean;
  isFollowing: boolean;

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
