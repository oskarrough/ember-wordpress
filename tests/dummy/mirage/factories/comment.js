import { Factory, association } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  author_avatar_urls() {
    return {
      24: faker.image.avatar(),
      48: faker.image.avatar(),
      96: faker.image.avatar(),
    };
  },

  author_name() {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  },

  body() {
    return {
      rendered: faker.lorem.text(),
    };
  },

  date() {
    return new Date(faker.date.past());
  },

  post: association(),

  status: 'approved',
});
