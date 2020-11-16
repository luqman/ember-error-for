ember-error-for
==============================================================================

Simple wrapper for javascript [constraint](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) error messages.

It should satisfy very simple forms.

![Demo](https://raw.githubusercontent.com/luqman/ember-error-for/main/demo.gif)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-error-for
```


Usage
------------------------------------------------------------------------------

It renders a span tag with `[hidden]` attribute set.

```hbs
  <form>
    <input type="text" name="username" required>
    <ErrorFor @name="username" />
    <input type="submit">
  </form>
```

Now instead of getting the default browser error message bubble, it will render the error inline.

All possible validations related attributes can be found [here](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation).

You can override error messages by passing in one of the [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) properties.

e.g.

```hbs
  <form>
    <input type="text" name="username" required>
    <ErrorFor @name="username"
      @valueMissing="Please provider your username" />
    <input type="submit">
  </form>
```

Todo
------------------------------------------------------------------------------

- [ ] Add more tests

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
