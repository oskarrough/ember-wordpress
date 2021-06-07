import { attr } from '@ember-data/model';
import BaseModel from './base';

export default class AttachmentModel extends BaseModel {
  @attr('rendered') title;
  @attr media_details;
  @attr('string') source_url;
  @attr('rendered') caption;
  @attr('rendered') description;
}
