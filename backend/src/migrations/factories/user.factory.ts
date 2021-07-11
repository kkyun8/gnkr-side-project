import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';
import { User } from 'src/user/user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.name = 'hoge';
  user.email = 'hoge';
  user.password = '1234';
  return user;
});
