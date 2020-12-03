import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { triggerEvent } from '@ember/test-helpers';

module('Unit | Service | eh-hotspots', function (hooks) {
  setupTest(hooks);

  test('it manages state for showHotspots', async function (assert) {
    let service = this.owner.lookup('service:eh-hotspots');
    assert.ok(service);
    assert.notOk(service.showHotspots);
    await triggerEvent(document, 'mousedown');
    assert.ok(service.showHotspots);
    await triggerEvent(document, 'mouseup');
    assert.notOk(service.showHotspots);
    await triggerEvent(document, 'touchdown');
    assert.ok(service.showHotspots);
    await triggerEvent(document, 'touchup');
    assert.notOk(service.showHotspots);
  });
});
