import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import click from '@ember/test-helpers/dom/click';
import settled from '@ember/test-helpers/settled';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('posts work', async function (assert) {
    let posts = server.createList(
      'post',
      10,
      'withTags',
      'withCategories',
      'withReplies'
    );
    let firstPost = posts[0];

    server.create(
      'page',
      { title: { rendered: 'about' } },
      'withTags',
      'withCategories'
    );

    await visit('/posts');

    assert.equal(currentURL(), '/posts');
    assert.dom('[data-test-posts-link]').exists({ count: 10 });
    assert.dom('[data-test-posts-link]').hasText(firstPost.title.rendered);

    await click('[data-test-posts-link]');

    // To let Ember-Data relationships load
    await settled();

    assert.equal(currentURL(), `/posts/${firstPost.slug}`);
    assert.dom('[data-test-post-title]').hasText(firstPost.title.rendered);
    assert.dom('[data-test-post-id]').hasText(firstPost.id);
    assert.dom('[data-test-post-date]').hasText(firstPost.date.toString());

    assert
      .dom('[data-test-post-image]')
      .hasAttribute(
        'src',
        firstPost['wp:featuredmedia'].media_details.sizes.thumbnail.source_url
      );

    assert.dom('[data-test-post-body]').hasText(firstPost.body.rendered);

    assert
      .dom('[data-test-post-category]')
      .exists({ count: firstPost.categories.length });
    assert.dom('[data-test-post-tag]').exists({ count: firstPost.tags.length });
    assert
      .dom('[data-test-post-comment]')
      .exists({ count: firstPost.replies.length });
  });

  test('categories work', async function (assert) {
    let categories = server.createList('category', 20);
    let firstCategory = categories[0];

    let posts = server.createList('post', 4, {
      categoryIds: [firstCategory.id],
    });
    let firstPost = posts[0];

    server.create('page', { title: { rendered: 'about' } });

    await visit('/categories');

    assert.equal(currentURL(), '/categories');

    assert.dom('[data-test-category-link]').exists({ count: 10 });
    assert.dom('[data-test-category-link]').hasText(firstCategory.name);

    await click('[data-test-category-link]');

    // Wait for relationships to load
    await settled();

    assert.equal(currentURL(), `/categories/${firstCategory.slug}`);

    assert.dom('[data-test-category-name]').hasText(firstCategory.name);
    assert.dom('[data-test-post-link]').exists({ count: 4 });
    assert.dom('[data-test-post-link]').hasText(firstPost.title.rendered);

    await click('[data-test-post-link]');

    assert.equal(currentURL(), `/posts/${firstPost.slug}`);
  });

  test('page work', async function (assert) {
    let page = server.create('page', { title: { rendered: 'about' } });

    await visit('/page/about');

    assert.equal(currentURL(), '/page/about');

    assert.dom('[data-test-post-title]').hasText(page.title.rendered);
    assert.dom('[data-test-post-id]').hasText(page.id);
    assert.dom('[data-test-post-date]').hasText(page.date.toString());

    assert
      .dom('[data-test-post-image]')
      .hasAttribute(
        'src',
        page['wp:featuredmedia'].media_details.sizes.thumbnail.source_url
      );

    assert.dom('[data-test-post-body]').hasText(page.body.rendered);

    assert
      .dom('[data-test-post-category]')
      .exists({ count: page.categories.length });
    assert.dom('[data-test-post-tag]').exists({ count: page.tags.length });
    assert
      .dom('[data-test-post-comment]')
      .exists({ count: page.replies.length });
  });
});
