import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	// This is my example Wordpress installation. Replace it with your own.
	host: 'http://dev-ember-wp.pantheon.io',
	// Namespace is matched with the default for WP-API v2.
	namespace: 'wp-json/wp/v2'
});
