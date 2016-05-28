# Ember Wordpress

Helps you connect Ember Data with the official Wordpress API (WP-API). An extremely powerful combination.

Ember Wordpress is an addon for ember-cli. Once installed, you'll have what you need to get data out of the Wordpress API. That is, an application adapter, serializer as well as the default models (post, page, category, tag).

## Demonstration

- [Demo](http://ember-wordpress.surge.sh/)
- [Source code](https://github.com/oskarrough/ember-wordpress/tree/master/tests/dummy/app)
- [API for the demo](http://dev-ember-wordpress.pantheonsite.io/wp-json/wp/v2/)

## How to use

Make sure you're using ember-cli and ember data 2.

1. `ember install ember-wordpress`
2. Set your `wordpressHost` in `config/environment.js`
3. Install Wordpress with the WP-API v2 plugin (see below)

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

You'll need to install the [WP API v2](https://wordpress.org/plugins/rest-api/) plugin. After installing, if you see your data at `example.com/wp-json/wp/v2` it works.

[WP-CORS](https://wordpress.org/plugins/wp-cors/), [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) and [ACF To REST API](https://wordpress.org/plugins/acf-to-rest-api/) work really well with this setup.

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

You'll have four models ready out of the box:  `post`, `page`, `category` and `tag`.  If you want to extend a model and add an extra property, do it like this:

```js
// app/models/post.js
import DS from 'ember-data';
import PostModel from 'ember-wordpress/models/post';
export default PostModel.extend({
  myNewProperty: DS.attr()
});
```

Note: `post` and `page` are identical, as are `category` and `tag`.

## Queries

The WP API supports many [arguments](http://v2.wp-api.org/reference/posts/) (follow the link and scroll down to "arguments") that you can use but it's not super friendly so here are some tips. As always, please see the source code for the demo for examples as well.

### How to query more than 10 items

By default the WP API returns a maximum of 10 items. For instance, `this.store.findAll('post')` would return 10 posts. To change that we need to find the right argument and endpoint. Looking at the documentation for WP API we find `per_page`. It could look like `wp-json/wp/v2/posts?per_page=99` which translates into the ember-data query `this.store.query('post', {per_page: 99})`.

### How to query by slug

To query a post by slug use the endpoint `wp-json/wp/v2/posts?filter[name=my-post]` and query `this.store.query('post', {filter: {name: 'my-post'}}).then(models => models.get('firstObject'));`. We take the first object because `query` always returns an array and here we are only after a single item.

### How to query by category

To query posts by category slug use the endpoint `wp-json/wp/v2/posts?per_page=99&filter[category_name=my-category]` and query `this.store.query('post', {per_page: 99, filter: {category_name: 'my-category'}})`.

## Questions?

While this ember addon is fairly untested, the setup isn't. It works :) Please ask any questions here https://github.com/oskarrough/ember-wordpress/issues.

## Contributing

It's the goal of ember-wordpress to be the bridge between ember/ember-data and the official WP REST API. Ideally, in addition to the provided adapter, serializer and models, the project's dummy app should serve as an example how to work with it.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
