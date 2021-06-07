import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('page', { path: 'page/:page_slug' });
  this.route('posts', function () {
    this.route('post', { path: ':post_slug' });
  });
  this.route('categories', function () {
    this.route('category', { path: ':category_slug' });
  });
});
