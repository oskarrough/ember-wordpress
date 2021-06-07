import Route from '@ember/routing/route';

export default class PageRoute extends Route {
  model(params) {
    // Query a single page by slug/name
    return this.store
      .query('wordpress/page', {
        slug: params.page_slug,
      })
      .then((models) => models.toArray()[0]);
  }
}
