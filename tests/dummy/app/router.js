import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function () {
	this.route('page', {path: 'page/:page_slug'});
	this.route('posts', function () {
		this.route('post', {path: ':post_slug'});
	});
	this.route('categories', function () {
		this.route('category', {path: ':category_slug'});
	});
});

export default Router;
