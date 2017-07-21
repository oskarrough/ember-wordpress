import { test } from 'ember-qunit';
import getHeader from 'ember-ajax/utils/get-header';

test('returns undefined when headers are undefined', function(assert) {
  const header = getHeader(undefined);

  assert.equal(header, undefined, 'undefined is returned');
});

test('returns undefined when name is undefined', function(assert) {
  const header = getHeader({}, undefined);

  assert.equal(header, undefined, 'undefined is returned');
});

test('matches result given by direct object access', function(assert) {
  const headers = {
    'wp-total-pages': '80',
    'Wp-Total': '800',
    'date': 'Fri, 12 Feb 2016 19:21:00 GMT'
  };

  assert.equal(getHeader(headers, 'wp-total-pages'), headers['wp-total-pages'], 'matches direct object access');
  assert.equal(getHeader(headers, 'Wp-Total'), headers['Wp-Total'], 'matches direct object access');
  assert.equal(getHeader(headers, 'date'), headers.date, 'matches direct object access');
});

test('performs case-insensitive lookup', function(assert) {
  const headers = {
    'wp-total-pages': '80',
    'Wp-Total': '800',
    'date': 'Fri, 12 Feb 2016 19:21:00 GMT'
  };

  assert.equal(getHeader(headers, 'wp-total-pAgEs'), headers['wp-total-pages'], 'matches case insensitive header');
  assert.equal(getHeader(headers, 'wP-ToTAl'), headers['Wp-Total'], 'matches case insensitive header');
  assert.equal(getHeader(headers, 'DATE'), headers.date, 'matches case insensitive header');
});
