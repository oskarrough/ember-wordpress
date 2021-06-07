import Transform from '@ember-data/serializer/transform';

export default class RenderedTransform extends Transform {
  deserialize(serialized) {
    // Depending on Wordpress version, this will exist. Or not.
    if (serialized.rendered) {
      return serialized.rendered;
    }
    return serialized;
  }

  serialize(deserialized) {
    return deserialized;
  }
}
