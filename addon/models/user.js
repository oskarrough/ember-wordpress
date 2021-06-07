import { attr } from '@ember-data/model';
import BaseModel from './base';

export default class UserModel extends BaseModel {
  @attr('string') name;
  @attr('string') slug;
  @attr() avatar_urls;

  get avatar_url_24() {
    return this.avatar_urls['24'];
  }

  get avatar_url_48() {
    return this.avatar_urls['48'];
  }

  get avatar_url_96() {
    return this.avatar_urls['96'];
  }
}
