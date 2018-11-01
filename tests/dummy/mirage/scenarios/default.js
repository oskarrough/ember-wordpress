export default function (server) {
  server.createList('post', 10, 'withTags', 'withCategories', 'withReplies');
  server.create('page', {title: {rendered: 'about'}}, 'withTags', 'withCategories');
}
