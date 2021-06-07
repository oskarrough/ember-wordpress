import RESTAdapter from '@ember-data/adapter/rest';
import getHeader from '../utils/get-header';
import { getOwner } from '@ember/application';

// The WP API requires a rest adapter.
export default class WordpressAdapter extends RESTAdapter {
  // Where your Wordpress installation is.
  // host;

  // Whether to send many requests or to one-big request.
  // coalesceFindRequests;

  // This is the default namespace for WP API v2.
  // namespace;

  constructor() {
    super(...arguments);

    let config = getOwner(this).resolveRegistration('config:environment');

    this.host =
      typeof this.host !== 'undefined' ? this.host : config.emberWordpress.host;

    this.coalesceFindRequests =
      typeof this.coalesceFindRequests !== 'undefined'
        ? this.coalesceFindRequests
        : config.emberWordpress.coalesceFindRequests || false;

    this.namespace =
      typeof this.namespace !== 'undefined'
        ? this.namespace
        : config.emberWordpress.namespace || 'wp-json/wp/v2';
  }

  handleResponse(status, headers, payload, requestData) {
    // Wordpress sends meta data (useful for pagination) in GET requests headers.
    // Here we move it to a `meta` property which Ember expects.
    if (payload) {
      const meta = {
        total: getHeader(headers, 'X-WP-Total'),
        totalPages: getHeader(headers, 'X-WP-TotalPages'),
      };
      payload.meta = meta;
    }
    return super.handleResponse(status, headers, payload, requestData);
  }

  pathForType(modelName) {
    modelName = modelName.replace('wordpress/', '');
    return super.pathForType(modelName);
  }

  findMany(store, type, ids, snapshots) {
    let url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
    return this.ajax(url, 'GET', { data: { include: ids } });
  }
}
