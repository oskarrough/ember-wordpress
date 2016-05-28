// This is the base class used for the 'Category' and 'Tag' models

import DS from 'ember-data';

const {Model, attr} = DS;

export default Model.extend({
	count: attr('number'),
	description: attr('string'),
	link: attr('string'),
	name: attr('string'),
	slug: attr('string'),
	taxonomy: attr('string'),
	parent: attr('number')
});
