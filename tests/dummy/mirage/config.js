import config from 'ember-get-config';

export default function () {
  this.urlPrefix = config.wordpressHost;
  this.namespace = '/wp-json/wp/v2';

  this.resource('category');
  this.resource('page');
  this.resource('post');
  this.resource('tag');
  this.get('/media/:id', 'attachment');
}
