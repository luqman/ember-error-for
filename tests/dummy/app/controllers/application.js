import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @action
  onSubmit(e) {
    e.preventDefault();
    alert('form is valid');
  }
}
