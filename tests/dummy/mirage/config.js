import config from 'ember-get-config';

export default function () {
  this.urlPrefix = config.wordpressHost;
  this.namespace = '/wp-json/wp/v2';

  this.get('/posts');
}
