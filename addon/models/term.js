// This is the base class used for the 'Category' and 'Tag' models
import BaseModel from './base';
import DS from 'ember-data';
const { attr } = DS;

export default BaseModel.extend({
	count: attr('number'),
	description: attr('string'),
	link: attr('string'),
	name: attr('string'),
	slug: attr('string'),
	taxonomy: attr('string'),
	parent: attr('number')
});
