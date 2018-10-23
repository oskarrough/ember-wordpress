# Ember Wordpress

Ember Wordpress is an addon for ember-cli that makes it easy to fetch data from the Wordpress API (WP-API) in your Ember sites. It includes an application adapter, serializer as well as some default models: post, page, category and tag.

## Demonstration

- [Demo website](https://ember-wordpress.surge.sh/)
- [Source code for the demo](https://github.com/oskarrough/ember-wordpress/tree/master/tests/dummy/app)
- [API for the demo](https://dev-ember-wordpress.pantheonsite.io/wp-json/wp/v2/)

> Note, the demo API sometimes goes to _sleep_. Please open an issue if so.

Here's a couple of sites using Ember.js + Wordpress:

- https://www.alivefestival.dk
- http://pfadfinderei.com
- http://magnus-winter.de
- http://kunstjagd.com

## How to install

1. Run `ember install ember-wordpress`
2. In the `config/environment.js` file, define the address to your Wordpress install. Like this:

```js
var ENV = {
  wordpressHost: 'https://my-wordpress-site.com'
  ...
}
```

## Models

You'll have seven models ready out of the box: `wordpress/post`, `wordpress/page`, `wordpress/category` `wordpress/tag`, `wordpress/attachment`,  `wordpress/comment`, `wordpress/user`.

Note: the `wordpress/post` and `wordpress/page` models are identical and so are `wordpress/category` and `wordpress/tag`. For your own custom post types, it is recommended to extend the `post` model:

```js
// app/models/recipe.js
import DS from 'ember-data';
import PostModel from 'ember-wordpress/models/post';
export default PostModel.extend({
  ingredients: DS.attr()
});
```

If you're using the ACF plugin your custom fields will be at `model.get('acf.myCustomField')`.

## Configuring Wordpress

Since Wordpress version 4.7 the REST API is included in core Wordpress. If you are on an earlier version you will need to install the [WP API v2](https://wordpress.org/plugins/rest-api/) plugin, which also works fine.

After installing, create some posts or pages in Wordpress and see your data at `example.com/wp-json/wp/v2`.

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

## Queries

The WP API supports many [arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments) that you can use but it's not super friendly so here are some tips.

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

## Contributing

It's the goal of ember-wordpress to be the bridge between ember/ember-data and the official WP REST API. Ideally, in addition to the provided adapter, serializer and models, this readme and the project's demo app should serve as good examples. Please ask any questions here https://github.com/oskarrough/ember-wordpress/issues.
