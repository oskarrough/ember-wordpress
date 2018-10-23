import BaseModel from './base';
import DS from "ember-data";
const { attr } = DS;
import { alias } from '@ember/object/computed';

export default BaseModel.extend({
  name: attr('string'),
  slug: attr('string'),
  avatar_urls: attr(),
  avatar_url_24: alias('avatar_urls.24'),
  avatar_url_48: alias('avatar_urls.48'),
  avatar_url_96: alias('avatar_urls.96')
});
