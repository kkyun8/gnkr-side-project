import { Factory, Seeder } from 'typeorm-seeding';
import { User } from 'src/user/user.entity';
import { Feed } from 'src/feed/feed.entity';
import { Tag } from 'src/tags/tag.entity';
import { saltOrRounds } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

export default class CreateDatas implements Seeder {
  public async run(factory: Factory) {
    let index = 0;
    await factory(User)()
      .map(async (user: User) => {
        const { name, email, password } = user;
        user.name = `${name}${index}`;
        user.email = `${email}${index}`;
        const hash = await bcrypt.hash(password, saltOrRounds);
        user.password = hash;
        index++;
        return user;
      })
      .createMany(5);

    let tindex = 0;
    await factory(Tag)()
      .map(async (tag: Tag) => {
        tag.name = `${tag.name}${tindex}`;
        tindex++;
        return tag;
      })
      .createMany(5);

    let findex = 0;
    // TODO: id9以上登録できない
    await factory(Feed)()
      .map(async (feed: Feed) => {
        feed.title = `${feed.title}${findex}`;
        feed.body = `${feed.body}${findex}`;
        findex++;
        return feed;
      })
      .createMany(9);
  }
}
