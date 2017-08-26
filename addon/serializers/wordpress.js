import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	isNewSerializerAPI: true,

	// Here we wrap the payload in a named object after the model type
	// because this is what Ember expects { post: { datahere } }
	normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
		var payloadTemp = {};
		payloadTemp[primaryModelClass.modelName] = [payload];

		return this._super(store, primaryModelClass, payloadTemp, id, requestType);
	},

	// Then, we can deal with our missing root element when extracting arrays from the JSON.
	normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
		const payloadTemp = {};
		const rootKey = Ember.String.pluralize(primaryModelClass.modelName);

		payloadTemp[rootKey] = payload;

		return this._super(store, primaryModelClass, payloadTemp, id, requestType);
	},

	normalize(modelClass, hash, prop) {
    /* For fields like content, title and excerpt the Wordpress API returns a format like this:
      title: {rendered: "my title"}
      or for empty fields:
      title: {rendered: ""}
      ... this results in [object Object] in Ember templates.
      Make sure to either return the `rendered` part or `null`.
    */
	  function getRendered (prop) {
			if (prop && prop.rendered) {
				return prop.rendered;
			}
			return null;
		}

		hash.content = getRendered(hash.content)
		hash.title = getRendered(hash.title)
		hash.excerpt = getRendered(hash.excerpt)

		return this._super(modelClass, hash, prop);
	}
});
