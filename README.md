# Ember Wordpress

This will help you connect Ember Data with the official Wordpress API also known as the WP-API. Works fine with Ember Data 2.x and WP API v2.

- [Demo](http://ember-wordpress.surge.sh/)

## How to use

This addon works with ember-cli. You need to install it and define your `wordpressHost`.

`ember install ember-wordpress`

Add this line to your `config/environment.js` file with the domain where your wordpress is running:

```
var ENV = {
  ...
  wordpressHost: 'http://my-wordpress-install.com'
  ...
```

For an example setup, see the `tests/dummy` folder in this repository.
