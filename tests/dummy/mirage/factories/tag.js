import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return faker.lorem.word();
  },

  afterCreate(tag) {
    tag.update({
      slug: faker.helpers.slugify(tag.name),
    });
  },
});
