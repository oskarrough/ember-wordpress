import config from 'dummy/config/environment';

export default function () {
  this.urlPrefix = config.emberWordpress.host;
  this.namespace = '/wp-json/wp/v2';

  this.get('/posts', ({ posts }, request) => {
    return filterRecordsByRequest(posts, request);
  });

  this.get('/pages', ({ pages }, request) => {
    return filterRecordsByRequest(pages, request);
  });

  this.get('/media', ({ attachments }, request) => {
    return filterRecordsByRequest(attachments, request);
  });

  this.get('/tags', ({ tags }, request) => {
    return filterRecordsByRequest(tags, request);
  });

  this.get('/categories', ({ categories }, request) => {
    return filterRecordsByRequest(categories, request);
  });

  this.get('/tags/:id');
  this.get('/categories/:id');
  this.get('/attachments/:id');
  this.get('/comments/:id');

  const filterRecordsByRequest = function (records, request) {
    const per_page = request.queryParams.per_page
      ? request.queryParams.per_page
      : 10;
    const page = request.queryParams.page ? request.queryParams.page : 1;

    let where_params = {};

    if (request.queryParams.slug) where_params.slug = request.queryParams.slug;

    return records
      .where(where_params)
      .slice(per_page * page - per_page, per_page * page);
  };
}
