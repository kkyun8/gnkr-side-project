import { define } from 'typeorm-seeding';
import * as Faker from 'faker/locale/ja';
import { Tag } from 'src/tags/tag.entity';

define(Tag, (faker: typeof Faker) => {
  const tag = new Tag();
  tag.name = 'tagname';
  tag.body = 'tagbody';
  return tag;
});
