import Model, { attr } from '@ember-data/model';

export default class BaseModel extends Model {
  @attr acf;
  @attr('date') date;
  @attr('date') date_gmt;
}
