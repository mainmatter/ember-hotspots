import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

module('Integration | Component | eh-hotspot', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a plain hotspot', async function (assert) {
    this.set('noop', () => {});

    await render(hbs`<EhHotspot @rect={{array 20 30 10 50}} />`);

    assert.dom('[data-test-eh-hotspot]').exists();
    assert.dom('[data-test-eh-hotspot]').hasStyle({
      width: '10px',
      height: '50px',
      top: '30px',
      left: '20px',
    });
    assert.dom('[data-test-eh-hotspot]').doesNotHaveAttribute('role');
  });

  test('it renders an action hotspot', async function (assert) {
    assert.expect(4);

    this.set('noop', () => {
      assert.ok(true);
    });

    await render(
      hbs`<EhHotspot @rect={{array 20 30 10 50}} @action={{this.noop}} />`
    );

    assert.dom('[data-test-eh-hotspot]').exists();
    assert.dom('[data-test-eh-hotspot]').hasStyle({
      width: '10px',
      height: '50px',
      top: '30px',
      left: '20px',
    });
    assert.dom('[data-test-eh-hotspot]').hasAttribute('role', 'button');

    await click('[data-test-eh-hotspot]');
  });

  test('it renders a linked hotspot', async function (assert) {
    assert.expect(4);

    this.owner.register(
      'service:router',
      class MockService extends Service {
        transitionTo(route) {
          assert.equal(route, 'index');
        }
      }
    );

    await render(hbs`<EhHotspot @rect={{array 20 30 10 50}} @route="index" />`);

    assert.dom('[data-test-eh-hotspot]').exists();
    assert.dom('[data-test-eh-hotspot]').hasStyle({
      width: '10px',
      height: '50px',
      top: '30px',
      left: '20px',
    });
    assert.dom('[data-test-eh-hotspot]').hasAttribute('role', 'link');

    await click('[data-test-eh-hotspot]');
  });

  test('it renders an hotspot defined by an image', async function (assert) {
    assert.expect(3);

    this.owner.register(
      'service:eh-hotspots',
      class MockService extends Service {
        load() {
          assert.ok(true);
        }

        data = {
          'bar.jpg': {
            width: 500,
            height: 400,
            size: 452192,
            isRetina: true,
          },
        };
      }
    );

    await render(hbs`<EhHotspot @rect={{array 20 50 10 10}} @src="bar.jpg" />`);

    assert.dom('[data-test-eh-hotspot]').exists();
    assert.dom('[data-test-eh-hotspot]').hasStyle({
      width: '500px',
      height: '400px',
      top: '50px',
      left: '20px',
      'background-image': `url("${
        window.location.href.split('/index.html')[0]
      }/bar.jpg")`,
    });
  });

  test('it supports the custom hover trigger', async function (assert) {
    assert.expect(3);

    this.set('noop', () => {
      assert.ok(true);
    });

    await render(
      hbs`<EhHotspot @rect={{array 20 50 10 10}} @trigger="hover" @action={{this.noop}} />`
    );

    assert.dom('[data-test-eh-hotspot]').exists();

    await triggerEvent('[data-test-eh-hotspot]', 'mouseenter');
    await triggerEvent('[data-test-eh-hotspot]', 'mouseleave');
  });
});
