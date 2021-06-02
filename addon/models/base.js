import Model, { attr } from '@ember-data/model';

export default Model.extend({
  acf: attr(),
  date: attr('date'),
  date_gmt: attr('date'),
});
