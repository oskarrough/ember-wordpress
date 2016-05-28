import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// Query a single page by slug/name
		return this.store.query('page', {
			filter: {name: params.slug}
		}).then(models => models.get('firstObject'));
	}
});
