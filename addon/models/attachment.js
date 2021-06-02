import { attr } from '@ember-data/model';
import BaseModel from './base';

export default BaseModel.extend({
  title: attr('rendered'),
  media_details: attr(),
  source_url: attr('string'),
  caption: attr('rendered'),
  description: attr('rendered')
});
