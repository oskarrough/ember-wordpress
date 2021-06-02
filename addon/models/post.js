import { hasMany, attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';
import { computed } from '@ember/object';

export default BaseModel.extend({
  comment_status: attr('string'),
  content: attr('rendered'),
  excerpt: attr('rendered'),
  link: attr('string'),
  menu_order: attr('number'),
  modified: attr('date'),
  modified_gmt: attr('date'),
  ping_status: attr('string'),
  slug: attr('string'),
  status: attr('string'),
  template: attr('string'),
  title: attr('rendered'),
  author: belongsTo('wordpress/user'),
  replies: hasMany('wordpress/comment'),
  'wp:attachment': hasMany('wordpress/attachment'),
  'wp:featuredmedia': belongsTo('wordpress/attachment'),
  tags: hasMany('wordpress/tag'),
  categories: hasMany('wordpress/category'),
  commentsAreOpen: computed('comment_status', function(){
    return this.get('comment_status') === 'open';
  })
})
