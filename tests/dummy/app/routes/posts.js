import Route from '@ember/routing/route';

export default class PostsRoute extends Route {
  model() {
    // By default the WP-API returns a maximum of 10 items.
    // return this.store.findAll('post');

    // To get more we can query with `per_page`.
    return this.store.query('wordpress/post', { per_page: 99 });
  }
}
