import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// Query a single category by slug/name
		// To do this, the route has to have a dynamic params defined in router.js
		return this.store.query('category', {
			filter: {name: params.slug}
		}).then(models => models.get('firstObject'));
	},

	setupController(controller, category) {
		// Query posts by category
		const posts = this.store.query('post', {
			filter: {category_name: category.get('name')}
		});
		controller.set('category', category);
		controller.set('posts', posts);
	}
});
