import DS from 'ember-data';
import config from 'ember-get-config';
import getHeader from '../utils/get-header';

// The WP API requires a rest adapter.
export default DS.RESTAdapter.extend({
  // Where your Wordpress installation is.
	host: config.emberWordpress.host,

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
  },

  findMany(store, type, ids, snapshots) {
    let url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
    return this.ajax(url, 'GET', { data: { include: ids } });
  }
});
