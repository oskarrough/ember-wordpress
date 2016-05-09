# Ember Wordpress

This will help you connect Ember Data with the official Wordpress API also known as the WP-API. An extremely powerful and simple combination. You'll need to be using Ember Data > 2 and WP API v2.

This addon works with ember-cli. Once installed, you'll have an application adapter, serializer as well as the default models (post, page, category, tag) that you need to get data out of the Wordpress API. As this is a work in progress, in this readme you'll find some helpful advice. Also see the `tests/dummy` folder in this repository where you'll find an example application.

## Demonstration

- [Demo](http://ember-wordpress.surge.sh/)
- [Demo source code](https://github.com/oskarrough/ember-wordpress/tree/master/tests/dummy/app)
- [Demo WP API](http://dev-ember-wordpress.pantheon.io/wp-json/wp/v2/)

## How to use

1. Install it: `ember install ember-wordpress`
2. Define your `host` in `config/environment.js`.

Your host is where your Wordpress is running. Example:

```
var ENV = {
  ...
  emberWordpress: {
    host: 'http://my-wordpress-install.com'
  }
  ...
```

## Wordpress requirements

You'll need to install the [WP API v2](https://wordpress.org/plugins/rest-api/) plugin and possibly [WP-CORS](https://wordpress.org/plugins/wp-cors/). If you see your data at example/com/wp-json/wp/v2 it works.

[Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) and [ACF To REST API](https://wordpress.org/plugins/acf-to-rest-api/) work really well with this setup.

### Wordpress custom post types

To use a custom post type together with the WP API you have to be aware of two additional arguments:

1. `show_in_rest` which must be set to true.
2. `rest_base` which will be the endpoint of your post type (set it to the plural form of your model)

Here's an example. You could save this file as `wp-content/plugins/my-custom-post-types.php`.

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

This addon provides models for post, page, category and tag. If you need to overwrite them, make sure they still extend the default ones provided by this addon. See [ember-wordpress/app/models](https://github.com/oskarrough/ember-wordpress/tree/master/app/models) as an example.

### Eager loading

By default, Ember loads every request to a record separately from the server. If you want to display a post and the names of all of it's tags for example, Ember will query the main post and every single tag. A post with five tags will result in six requests to the server. 

Since Ember and WP-API supports loading of multiple resources of the same type in one request, you can opt-in for this feature:

```
var ENV = {
  ...
  emberWordpress: {
    coalesceFindRequests: true
  }  
  ...
```

With this option enabled, loading a post with five tags will result in just two requests, because all tags of the post will be loaded together. This can improve the load time of your Ember app a lot!

## Contributing

It's the goal of ember-wordpress to become the bridge between ember/ember-data and the official WP REST API. Ideally, in adition to the provided serializer and models, the project's dummy app should serve as an example how to work with it.

[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Questions?

While this ember addon is fairly untested, the setup isn't. Feel free to ask any questions here https://github.com/oskarrough/ember-wordpress/issues.
