import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    // How to query a category by slug.
    return this.store.query('wordpress/category', {
      slug: params.category_slug
    }).then(models => models.get('firstObject'));
  },

  setupController(controller, category) {
    // How to query all posts with a certain category.
    const posts = this.store.query('wordpress/post', {
      categories: category.get('id')
    });
    controller.setProperties({
      category,
      posts
    });
  }
});
