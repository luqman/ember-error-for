export default class FormEvents {
  static FORMS = new WeakMap()

  callbacks = {}
  listening = false

  constructor(form) {
    this.form = form;
  }

  handleInvalid = (e) => {
    e.preventDefault(); // prevent default browser popup
    this.callbacks[e.target.name]
      .invalid(e);
  }

  handleInput = (e) => {
    this.callbacks[e.target.name]
      .input(e);
  }

  on(event, name, callback) {
    this.setupListeners();

    let callbacks = this.callbacks[name] || {};

    this.callbacks[name] = { ...callbacks, [event]: callback };
  }

  off(name) {
    delete this.callbacks[name];

    if (Object.keys(this.callbacks).length === 0) {
      this.removeListeners();
    }
  }

  setupListeners() {
    if (this.listening) {
      return;
    }

    this.form.addEventListener(
      'invalid',
      this.handleInvalid,
      true
    )

    this.form.addEventListener(
      'input',
      this.handleInput
    )

    this.listening = true;
  }

  removeListeners() {
    this.form.removeEventListener(
      'invalid',
      this.handleInvalid,
      true
    );

    this.form.removeEventListener(
      'input',
      this.handleInput,
    );

    this.listening = false;
  }

  static for(form) {
    if (FormEvents.FORMS.get(form) === undefined) {
      FormEvents.FORMS.set(form, new FormEvents(form))
    }

    return FormEvents.FORMS.get(form);
  }
}
