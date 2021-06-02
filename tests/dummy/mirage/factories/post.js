import { Factory, association, trait } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title() {
    return {
      rendered: faker.lorem.sentence(),
    };
  },

  excerpt() {
    return {
      rendered: faker.lorem.text(),
    };
  },

  content() {
    return {
      rendered: faker.lorem.text(),
    };
  },

  date() {
    return new Date(faker.date.past());
  },

  'wp:featuredmedia': association(),

  afterCreate(post) {
    post.update({
      slug: faker.helpers.slugify(post.title.rendered),
    });
  },

  withTags: trait({
    afterCreate(post, server) {
      post.update({
        tags: server.createList('tag', 4),
      });
    },
  }),

  withCategories: trait({
    afterCreate(post, server) {
      post.update({
        categories: server.createList('category', 4),
      });
    },
  }),

  withReplies: trait({
    afterCreate(post, server) {
      post.update({ comment_status: 'open' });
      server.createList('comment', 5, { post: post });
    },
  }),
});
