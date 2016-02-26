import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// Support for slugs.
		return this.store.query('page', {
			filter: {name: params.slug}
		}).then(models => models.get('firstObject'));
	}
});
