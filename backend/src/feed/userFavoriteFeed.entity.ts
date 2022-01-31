import { Entity, PrimaryColumn } from 'typeorm';

@Entity('user_favorite_feed')
export class UserFavoriteFeed {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  feedId: number;
}
