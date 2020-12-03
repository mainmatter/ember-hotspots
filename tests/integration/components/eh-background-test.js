import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Service from '@ember/service';

module('Integration | Component | eh-background', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    this.owner.register(
      'service:eh-hotspots',
      class MockService extends Service {
        load() {
          assert.ok(true);
        }

        data = {
          'foo.jpg': {
            width: 1300,
            height: 2828,
            size: 452192,
            isRetina: true,
          },
        };
      }
    );

    await render(hbs`
      <EhBackground @src="foo.jpg">
        content
      </EhBackground>
    `);

    assert.dom('[data-test-eh-background]').exists();
    assert.dom('[data-test-eh-background]').hasText('content');
    assert.dom('[data-test-eh-background]').hasStyle({
      height: '2828px',
      'background-image': `url("${
        window.location.href.split('/index.html')[0]
      }/foo.jpg")`,
    });
  });
});
