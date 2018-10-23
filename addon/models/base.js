import DS from 'ember-data';

export default DS.Model.extend({
  acf: DS.attr(),
  date: DS.attr('date'),
  date_gmt: DS.attr('date'),
});
