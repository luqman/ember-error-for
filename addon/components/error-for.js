import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import FormEvents from './-form-events';
import { empty } from '@ember/object/computed';

const ValidityStateProperties = [
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'valueMissing',
  'typeMismatch',
  'tooShort',
  'tooLong',
];

export default class ErrorForComponent extends Component {
  @empty('message') hidden
  @tracked message

  @action
  handleDidInsert(element) {
    let { args: { name } } = this
    let form = FormEvents.for(element.closest('form'));

    form.on('invalid', name, this.onInvalid)
    form.on('input', name, this.onInput)

    this.form = form;
  }

  @action
  handlWillDestroy() {
    this.form.off(this.args.name);
  }

  onInput = (e) => {
    if (e.target.validity.valid) {
      this.message = undefined;
    }
  }

  onInvalid = (e) => {
    let { target: { validity } } = e;
    let errorType = ValidityStateProperties.find(type => validity[type])

    if (errorType && errorType in this.args) {
      this.message = this.args[errorType];
    } else {
      this.message = e.target.validationMessage;
    }
  }
}
