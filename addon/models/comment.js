import { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import BaseModel from './base';

export default BaseModel.extend({
  author_avatar_urls: attr(),
  author_name: attr('string'),
  author_email: attr('string'),
  author_url: attr('string'),
  content: attr('rendered'),
  link: attr('string'),
  post: belongsTo('wordpress/post'),
  status: attr('string'),

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
