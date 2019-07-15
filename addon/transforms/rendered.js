import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    // Depending on Wordpress version, this will exist. Or not.
    if (serialized.rendered) {
      return serialized.rendered;
    }
    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
