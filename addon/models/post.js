import { hasMany, attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class PostModel extends BaseModel {
  @attr('string') comment_status;
  @attr('rendered') body;
  @attr('rendered') excerpt;
  @attr('string') link;
  @attr('number') menu_order;
  @attr('date') modified;
  @attr('date') modified_gmt;
  @attr('string') ping_status;
  @attr('string') slug;
  @attr('string') status;
  @attr('string') template;
  @attr('rendered') title;

  @belongsTo('wordpress/user') author;
  @hasMany('wordpress/comment') replies;
  @hasMany('wordpress/attachment') 'wp:attachment';
  @belongsTo('wordpress/attachment') 'wp:featuredmedia';
  @hasMany('wordpress/tag') tags;
  @hasMany('wordpress/category') categories;

  get commentsAreOpen() {
    return this.comment_status === 'open';
  }
}
