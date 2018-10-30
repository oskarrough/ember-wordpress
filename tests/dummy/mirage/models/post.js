import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  'wp:featuredmedia': belongsTo('attachment'),
  tags: hasMany('tag'),
  categories: hasMany('category'),
});
