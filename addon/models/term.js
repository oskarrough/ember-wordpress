// This is the base class used for the 'Category' and 'Tag' models
import { attr } from '@ember-data/model';
import BaseModel from './base';

export default class TermModel extends BaseModel {
  @attr('number') count;
  @attr('string') description;
  @attr('string') link;
  @attr('string') name;
  @attr('string') slug;
  @attr('string') taxonomy;
  @attr('number') parent;
}
