import Transform from '@ember-data/serializer/transform';
import { htmlSafe } from '@ember/template';

export default class RenderedTransform extends Transform {
  deserialize(serialized) {
    // Depending on Wordpress version, this will exist. Or not.
    if (serialized.rendered) {
      return htmlSafe(serialized.rendered);
    }
    return htmlSafe(serialized);
  }

  serialize(deserialized) {
    return deserialized;
  }
}
