import DS from 'ember-data';
import { computed } from '@ember/object';
import BaseModel from './base';

export default BaseModel.extend({
  author_avatar_urls: DS.attr(),
  author_name: DS.attr('string'),
  author_email: DS.attr('string'),
  author_url: DS.attr('string'),
  content: DS.attr('rendered'),
  link: DS.attr('string'),
  post: DS.belongsTo('wordpress/post'),
  status: DS.attr('string'),

  author_avatar_url_96: computed('author_avatar_urls', function () {
    return this.get('author_avatar_urls.96');
  }),

  isHolding: computed('status', function() {
    return this.get('status') === 'hold';
  }),

  isApproved: computed('status', function() {
    return this.get('status') === 'approved';
  })
});
