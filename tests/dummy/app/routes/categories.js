import Route from '@ember/routing/route';

export default class CategoriesRoute extends Route {
  model() {
    return this.store.findAll('wordpress/category');
  }
}
