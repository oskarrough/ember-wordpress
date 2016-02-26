import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// Support for slugs.
		return this.store.query('post', {
			filter: {name: params.slug}
		}).then(models => models.get('firstObject'));

		// If you don't need slugs, do this instead.
		// return this.store.findRecord('post', params.id);
	}
});
