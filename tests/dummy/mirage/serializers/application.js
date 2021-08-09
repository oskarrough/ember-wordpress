import { RestSerializer } from 'ember-cli-mirage';

export default class ApplicationSerializer extends RestSerializer {
  serialize(object, request) {
    let json = super.serialize(object, request);

    return json[Object.keys(json)[0]];
  }

  keyForForeignKey(relationshipName) {
    if (relationshipName === 'wp:featuredmedia') return relationshipName;
    return super.keyForForeignKey(...arguments);
  }

  keyForAttribute(attr) {
    return attr;
  }
}
