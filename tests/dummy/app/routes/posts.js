import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		// This would only return the ten latest.
		// return this.store.findAll('post');
		// 99 is the maximum WP API can return in one payload. For more
		// we have to resort to pagination. That's another chapter.
		return this.store.query('post', {per_page: 99});
	}
});
