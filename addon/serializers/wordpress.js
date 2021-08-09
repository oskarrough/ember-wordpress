import RESTSerializer from '@ember-data/serializer/rest';
import { pluralize } from 'ember-inflector';

export default class WordpressSerializer extends RESTSerializer {
  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedPayload = {};
    normalizedPayload[primaryModelClass.modelName] = [payload];

    return super.normalizeSingleResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedPayload = {};
    normalizedPayload.meta = payload.meta;
    delete payload.meta;
    normalizedPayload[pluralize(primaryModelClass.modelName)] = payload;
    return super.normalizeArrayResponse(
      store,
      primaryModelClass,
      normalizedPayload,
      id,
      requestType
    );
  }

  normalize(modelClass, hash, prop) {
    if (!('_links' in hash)) return super.normalize(modelClass, hash, prop);
    hash.links = {};
    Object.keys(hash['_links']).forEach((relationship) => {
      hash.links[relationship] = hash['_links'][relationship][0].href;
    });
    delete hash['_links'];
    return super.normalize(modelClass, hash, prop);
  }

  serializeIntoHash(data, type, record, options) {
    data = Object.assign(data, this.serialize(record, options));
  }

  extractMeta(store, typeClass, payload) {
    if (payload && payload['meta'] !== undefined) {
      let meta = payload.meta;
      delete payload.meta;
      return meta;
    }
  }
}
