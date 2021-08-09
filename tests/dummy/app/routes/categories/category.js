import Route from '@ember/routing/route';

export default class CategoryRoute extends Route {
  model(params) {
    // How to query a category by slug.
    return this.store
      .query('wordpress/category', {
        slug: params.category_slug,
      })
      .then((models) => models.toArray()[0]);
  }

  setupController(controller, category) {
    // How to query all posts with a certain category.
    const posts = category
      ? this.store.query('wordpress/post', {
          categories: category.get('id'),
        })
      : [];

    controller.setProperties({
      category,
      posts,
    });
  }
}
