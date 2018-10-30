import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    // If you don't need slugs, do this instead.
    // return this.store.findRecord('post', params.id);

    // Support for slugs.
    return this.store.query('wordpress/post', {
      slug: params.post_slug
    }).then(models => models.get('firstObject'));
  }
});
