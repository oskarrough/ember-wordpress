import { Factory, faker, association } from 'ember-cli-mirage';

export default Factory.extend({

  slug: faker.lorem.word,

  title() {
    return {
      rendered: faker.lorem.sentence()
    }
  },

  excerpt() {
    return {
      rendered: faker.lorem.text()
    }
  },

  content() {
    return {
      rendered: faker.lorem.text()
    }
  },

  date() {
    return new Date(faker.date.past());
  },

  'wp:featuredmedia': association()
});
