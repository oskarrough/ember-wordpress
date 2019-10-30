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
	_host_fb: computed('_host', function() {
		if (this.get('WORDPRESS_HOST_FASTBOOT')) {
			return this.get('WORDPRESS_HOST_FASTBOOT');
		}

		const HOST = this.getFromDotEnv('WORDPRESS_HOST_FASTBOOT');
		if (HOST) {
			this.set('WORDPRESS_HOST_FASTBOOT', HOST);
		} else if (this.get('_host')) {
			this.set('WORDPRESS_HOST_FASTBOOT', this.get('_host'));
		} else {
			this.set('WORDPRESS_HOST_FASTBOOT', config.emberWordpress.host);
		}

		return this.get('WORDPRESS_HOST_FASTBOOT');
	}),
	_host: computed(function() {
		if (this.get('WORDPRESS_HOST')) {
			return this.get('WORDPRESS_HOST');
		}

		const HOST = this.getFromDotEnv('WORDPRESS_HOST');
		if (HOST) {
			this.set('WORDPRESS_HOST', HOST);
		} else {
			this.set('WORDPRESS_HOST', config.emberWordpress.host);
		}

		return this.get('WORDPRESS_HOST');
	}),
	host: computed(function() {
		let fastboot = getOwner(this).lookup('service:fastboot');

		if (fastboot) {
			if (fastboot.get('isFastBoot')) {
				return this.get('_host_fb');
			}
		}
		return this.get('_host');
	}),

	getFromDotEnv(key) {
		let dotenv = getOwner(this).lookup('service:dotenv');

		if (!dotenv) {
			return null;
		}

		// dotenv was found and loaded, let’s fetch the variable
		const properties = dotenv.getProperties(key);

		if (typeof properties !== 'object') {
			return null;
		}

		if (typeof properties[key] === 'undefined') {
			return null;
		}

		return properties[key];
	},

	// Whether to send many requests or to one-big request.
	coalesceFindRequests: config.emberWordpress.coalesceFindRequests || false,

	// This is the default namespace for WP API v2.
	namespace: 'index.php/wp-json/wp/v2',

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
