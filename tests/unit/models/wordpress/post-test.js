import { moduleForModel, test } from 'ember-qunit';

moduleForModel('wordpress/post', 'Unit | Model | wordpress/post', {
  // Specify the other units that are required for this test.
  needs: [
    'model:wordpress/category',
    'model:wordpress/tag',
    'model:wordpress/user',
    'model:wordpress/comment',
    'model:wordpress/attachment'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
