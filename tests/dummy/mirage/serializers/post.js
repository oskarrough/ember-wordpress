import ApplicationSerializer from './application';

export default class PostSerializer extends ApplicationSerializer {
  include2() {
    return ['categories', 'tags', 'wp:featuredmedia', 'replies'];
  }
}
