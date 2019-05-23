import DS from 'ember-data';
import config from 'ember-get-config';
import getHeader from '../utils/get-header';
import {
	computed
} from '@ember/object';
import {
	getOwner
} from '@ember/application';

// The WP API requires a rest adapter.
export default DS.RESTAdapter.extend({

	/**
	 * Load this adapter after  'ember-cli-fastboot-dotenv' has loaded.
	 */
	after: 'ember-cli-fastboot-dotenv',

	/**
	 * --- was "host: config.emberWordpress.host " but has been modified to
	 * use ember-cli-fastboot-dotenv for fetching the wordpress host from the
	 * .env file (or any set environment variable)
	 */
	host: computed(function() {
		if (this.get('WORDPRESS_HOST')) {
			// Wordpress Hostb is already fetched, just return it!
			return this.get('WORDPRESS_HOST');
		}

		// host was not fetched yet, let’s ask dotenv service for the variable...
		let dotenv = getOwner(this).lookup('service:dotenv');

		if (dotenv) {
			// dotenv was found and loaded, let’s fetch the variable
			let {
				WORDPRESS_HOST
			} = dotenv.getProperties('WORDPRESS_HOST');

			if (WORDPRESS_HOST) {
				// we could find a WORDPRESS_HOST variable, let’s store it.
				this.set('WORDPRESS_HOST', WORDPRESS_HOST);

				// ...and return it.
				return this.get('WORDPRESS_HOST');
			}
		}

		// either dotenv was not found or it did not contain any WORDPRESS_HOST variable,
		// let’s get the host from the config...
		this.set('WORDPRESS_HOST', config.emberWordpress.host);

		// ...and return it.
		return this.get('WORDPRESS_HOST');
	}),

	// Whether to send many requests or to one-big request.
	coalesceFindRequests: config.emberWordpress.coalesceFindRequests || false,

	// This is the default namespace for WP API v2.
	namespace: 'wp-json/wp/v2',

	handleResponse(status, headers, payload, requestData) {
		// Wordpress sends meta data (useful for pagination) in GET requests headers.
		// Here we move it to a `meta` property which Ember expects.
		if (payload) {
			const meta = {
				total: getHeader(headers, 'X-WP-Total'),
				totalPages: getHeader(headers, 'X-WP-TotalPages')
			};
			payload.meta = meta;
		}
		return this._super(status, headers, payload, requestData);
	},

	pathForType: function(modelName) {
		modelName = modelName.replace('wordpress/', '');
		return this._super(modelName);
	}
});
