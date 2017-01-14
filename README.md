# Ember Wordpress

Helps you connect Ember Data with the official Wordpress API (WP-API). An extremely powerful combination.

Ember Wordpress is an addon for ember-cli. Once installed, you'll have what you need to get data out of the Wordpress API. That is, an application adapter, serializer as well as the default models: post, page, category and tag.

## Demonstration

- [Demo](https://ember-wordpress.surge.sh/)
- [Source code](https://github.com/oskarrough/ember-wordpress/tree/master/tests/dummy/app)
- [API for the demo](https://dev-ember-wordpress.pantheonsite.io/wp-json/wp/v2/)

## How to use

Make sure you're using ember-cli and ember data > 2.

1. `ember install ember-wordpress`
2. Define the address to your Wordpress install as `wordpressHost` in `config/environment.js`

Example:

```
var ENV = {
  ...
  wordpressHost: 'http://example.com'
  ...
}
```

Next we'll configure Wordpress.

## Configuring Wordpress

Since Wordpress 4.7 the REST API is included for you. If you can't upgrade, you'll need to install the [WP API v2](https://wordpress.org/plugins/rest-api/) plugin, which also works fine. After installing, create some posts or pages in Wordpress and see your data at `example.com/wp-json/wp/v2`.

If you're having CORS trouble: [WP-CORS](https://wordpress.org/plugins/wp-cors/)  
If you want custom fields: [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) and [ACF To REST API](https://wordpress.org/plugins/acf-to-rest-api/)

### Wordpress custom post types

To use a custom post type together with the WP API you have to be aware of two additional arguments, when you define them.

1. `show_in_rest` must be set to true.
2. `rest_base` will be the endpoint of your post type. Sset it to the plural form of your model, as this is what Ember expects. E.g. the endpoint for a `recipe` post type should be `recipies` and not `recipe`.

Here's a full example. You could save this file as `wp-content/plugins/my-custom-post-types.php`.

```php
<?php
/*
Plugin Name: My custom post types
Author URI: https://github.com/oskarrough/ember-wordpress/
*/
function artist_post_type() {
	$labels = array(
		'name' => 'Artists',
		'singular_name' => 'Artist',
		'menu_name' => 'Artists',
	);
	$args = array(
		'labels' => $labels,
		'show_in_rest'	=> true,
		'rest_base' => 'artists',
	);
	register_post_type('artist', $args);
}

add_action('init', 'artist_post_type');
?>
```

## Models

You'll have four models ready out of the box:  `post`, `page`, `category` and `tag`.  If you want to extend a model with more features, extend the model like this:

```js
// app/models/post.js
import DS from 'ember-data';
import PostModel from 'ember-wordpress/models/post';
export default PostModel.extend({
  myNewProperty: DS.attr()
});
```

Note: the `post` and `page` models are identical and so are `category` and `tag`. For custom post types, it is recommended to extend the `post` model. If you're using the ACF plugin your custom fields will be at `model.get('acf.myCustomField')`.

## Queries

The WP API supports many [arguments](http://v2.wp-api.org/reference/posts/) (follow the link and scroll down to "arguments") that you can use but it's not super friendly so here are some tips. As always, please see the source code for the demo for examples as well.

The endpoint is where to find the data in the WP REST API. 
The query is how that endpoint translates into the Ember data syntax.

### How to query more than 10 items

By default the WP API returns a maximum of 10 items. For instance, `this.store.findAll('post')` would return 10 posts. To change that we need to find the right argument and endpoint. Looking at the documentation for WP API we find `per_page`. It could look like `wp-json/wp/v2/posts?per_page=99` which translates into the ember-data query `this.store.query('post', {per_page: 99})`.

### How to query by slug

- Endpoint:  `wp-json/wp/v2/posts?slug=some-post-slug`
- Query: `this.store.query('post', {slug: 'some-post-plug'}).then(models => models.get('firstObject'));`

We take the first object because `query` always returns an array and we expect our query to only return a single object.

### How to query by category

To query posts by category slug you will need two queries.
 
First get the category id with the

- Endpoint: `wp-json/wp/v2/categories?slug=some-category-slug`
- Query: `this.store.query('category', {slug: 'some-category-slug'}).then(models => models.get('firstObject'));`

Then, get the posts

- Endpoint: `wp-json/wp/v2/posts?categories=category-id&per_page=99`
- Query: `this.store.query('post', {per_page: 99, categories: category-id}).then(models => models.get('firstObject'));`

### How to enable caching for the WP API

Enable caching by installing the [wp-rest-api-cache](https://github.com/airesvsg/wp-rest-api-cache) wordpress plugin.

## Server-side rendering with FastBoot

To get server-side rendering, install [Ember Fastboot](https://ember-fastboot.com/). Here's a [demo](https://ember-wordpress-nymqnnqwxp.now.sh/) of the Ember Wordpress dummy app served by fastboot. You'll see the actual HTML rendered if you view the source. Ember Wordpress doesn't require anything special to make this work. Here's a small [deployment tip](https://gist.github.com/oskarrough/42cef880cbfa874637e90c08102f18d0).

## Questions?

While this ember addon is fairly untested, the setup isn't. It works :) Please ask any questions here https://github.com/oskarrough/ember-wordpress/issues.

## Contributing

It's the goal of ember-wordpress to be the bridge between ember/ember-data and the official WP REST API. Ideally, in addition to the provided adapter, serializer and models, the project's dummy app should serve as an example how to work with it.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
