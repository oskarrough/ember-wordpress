import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized.rendered;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
