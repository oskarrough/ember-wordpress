import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include(){
    return ['categories', 'tags', 'wp:featuredmedia']
  }
});
