import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('page', {path: ':slug'});
  this.route('posts', {path: '/'}, function() {
    this.route('post', {path: '/post/:slug'});
  });
});

export default Router;
