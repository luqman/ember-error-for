import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | error-for', function(hooks) {
  setupRenderingTest(hooks);

  module('required', function(hooks) {
    hooks.beforeEach(function() {
      this.onSubmit = (e) => e.preventDefault();
    });

    test('input', async function(assert) {
      await render(hbs`
        <form>
          <input type="text"
            name="username" required />
          <ErrorFor @name="username"
            @valueMissing="Please fill in this field." />
          <input type="submit">
        </form>
        `);

      await click('input[type=submit]')

      assert.dom('[data-error-for="username"]')
        .hasText('Please fill in this field.');

      await fillIn('input[name=username]', 'ronaldo');

      assert.dom('[data-error-for="username"]')
        .hasNoText();

      assert.dom('[data-error-for="username"]')
        .hasAttribute('hidden');
    });

    test('select', async function(assert) {
      await render(hbs`
        <form {{on "submit" (fn this.onSubmit)}}>
          <select name="country" required>
            <option value=""></option>
            <option value="uk">United Kingdom</option>
            <option value="us">United States</option>
          </select>
          <ErrorFor @name="country"
            @valueMissing="Please select an item in the list." />
          <input type="submit">
        </form>
        `);

      await click('input[type=submit]')

      assert.dom('[data-error-for="country"]')
        .hasText('Please select an item in the list.');

      await fillIn('select[name=country]', 'uk');

      assert.dom('[data-error-for="country"]')
        .hasNoText();

      assert.dom('[data-error-for="country"]')
        .hasAttribute('hidden');
    });

    test('radio', async function(assert) {
      await render(hbs`
        <form {{on "submit" (fn this.onSubmit)}}>
          <input type="radio" name="terms" value="yes" required>
          <input type="radio" name="terms" value="no" required>
          <ErrorFor @name="terms"
            @valueMissing="Please select one of these options." />
          <input type="submit">
        </form>
      `);

      await click('input[type=submit]')

      assert.dom('[data-error-for="terms"]')
        .hasText('Please select one of these options.');

      await click('input[name=terms]:first-of-type');

      await this.pauseTest
      assert.dom('[data-error-for="terms"]')
        .hasNoText();

      assert.dom('[data-error-for="terms"]')
        .hasAttribute('hidden');
    });
  });
});
