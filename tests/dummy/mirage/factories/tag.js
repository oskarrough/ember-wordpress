import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  name() {
    return faker.lorem.word();
  },

  afterCreate(tag) {
    tag.update({
      slug: faker.helpers.slugify(tag.name)
    });
  },
});
