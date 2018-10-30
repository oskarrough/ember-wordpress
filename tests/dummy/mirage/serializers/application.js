import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  serialize(object, request) {
    let json = RestSerializer.prototype.serialize.call(this, object, request);
    return json[Object.keys(json)[0]];
  },

  keyForForeignKey(relationshipName) {
    if (relationshipName === 'wp:featuredmedia') return relationshipName;
    return RestSerializer.prototype.keyForForeignKey.apply(this, arguments);
  },

  keyForAttribute(attr){
    return attr;
  }
});
