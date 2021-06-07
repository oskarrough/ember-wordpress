import { attr, belongsTo } from '@ember-data/model';
import BaseModel from './base';

export default class CommentModel extends BaseModel {
  @attr author_avatar_urls;
  @attr('string') author_name;
  @attr('string') author_email;
  @attr('string') author_url;
  @attr('rendered') content;
  @attr('string') link;
  @attr('string') status;
  @belongsTo('wordpress/post') post;

  get author_avatar_url_96() {
    return this.author_avatar_urls['96'];
  }

  get isHolding() {
    return this.status === 'hold';
  }

  get isApproved() {
    return this.status === 'approved';
  }
}
