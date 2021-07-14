import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';
import { Feed } from 'src/feed/feed.entity';

define(Feed, (faker: typeof Faker) => {
  const feed = new Feed();
  feed.title = 'title';
  feed.body = 'body';
  feed.userId = 1;
  return feed;
});
