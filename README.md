# Ember Wordpress

This will help you connect Ember Data with the official Wordpress API also known as the WP-API. Works fine with Ember Data 2.x and WP API v2. An extremely powerful and easy combination.

- [Demo](http://ember-wordpress.surge.sh/)
- [Demo source code](https://github.com/oskarrough/ember-wordpress/tree/master/tests/dummy/app)
- [Demo WP API](http://dev-ember-wordpress.pantheon.io/wp-json/wp/v2/)

This addon works with ember-cli. Once installed, you'll have an application adapter, serializer as well as the default models (post, page, category, tag) that you need for Wordpress out of the box. For an example setup, see the `tests/dummy` folder in this repository.

## How to use

1. Install it: `ember install ember-wordpress`
2. Define your `wordpressHost` in `config/environment.js`.

Your host is where your Wordpress is running. Example:

```
var ENV = {
  ...
  wordpressHost: 'http://my-wordpress-install.com'
  ...
```

## Wordpress requirements

You'll need to install the [WP API v2](https://wordpress.org/plugins/rest-api/) plugin and possibly [WP-CORS](https://wordpress.org/plugins/wp-cors/). If you see your data at example/com/wp-json/wp/v2 it works.

[Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) and [ACF To REST API](https://wordpress.org/plugins/acf-to-rest-api/) work really well with this setup.

## Models

This addon provides models for post, page, category and tag. If you need to overwrite them, make sure they still extend the default ones provided by this addon. See [ember-wordpress/app/models](https://github.com/oskarrough/ember-wordpress/tree/master/app/models) as an example.

## Questions?

While this ember addon is fairly untested, the setup isn't. Feel free to ask any questions here [https://github.com/oskarrough/ember-wordpress/issues](issues).
