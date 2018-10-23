import DS from 'ember-data';
import BaseModel from './base';

export default BaseModel.extend({
  title: DS.attr('rendered'),
  media_details: DS.attr(),
  source_url: DS.attr('string'),
  caption: DS.attr('rendered')
});
