import DS from 'ember-data';

const {attr} = DS;

export default DS.Model.extend({
	count: attr('number'),
	description: attr('string'),
	link: attr('string'),
	name: attr('string'),
	slug: attr('string'),
	taxonomy: attr('string'),
	parent: attr('number')
});
