import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('follows')
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;

  @ManyToMany(() => User, (user) => user.followers, {
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  followerUser: User[];

  @ManyToMany(() => User, (user) => user.following, {
    // foreign key constraint failed 対応
    onDelete: 'CASCADE',
  })
  followingUser: User[];
}
