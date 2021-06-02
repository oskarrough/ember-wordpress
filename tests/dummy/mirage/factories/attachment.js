import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  media_details() {
    return {
      sizes: {
        thumbnail: {
          source_url: faker.image.imageUrl()
        },
        medium: {
          source_url: faker.image.imageUrl()
        },
        medium_large: {
          source_url: faker.image.imageUrl()
        },
        large: {
          source_url: faker.image.imageUrl()
        },
        full: {
          source_url: faker.image.imageUrl()
        }
      }
    }
  }
});
