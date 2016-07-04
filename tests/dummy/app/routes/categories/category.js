import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// How to query a category by slug
		return this.store.query('category', {
			slug: params.category_slug
		}).then(models => models.get('firstObject'));
	},

	setupController(controller, category) {
		// How to get all posts with by category slug
		const posts = this.store.query('post', {
			filter: {category_name: category.get('slug')}
		});
		controller.setProperties({
			category,
			posts
		});
	}
});
