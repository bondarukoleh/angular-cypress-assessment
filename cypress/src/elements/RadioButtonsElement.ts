import {GetJQueryElement} from '../shared/sharedInterfaces';
import Chainable = Cypress.Chainable;
import {stepDecorator} from '../../support/helpers/reporter';

class RadioButtonElement {
  private inputField: GetJQueryElement;

  constructor(private root: GetJQueryElement) {
    this.inputField = () => this.root().find('input');
  }

  @stepDecorator('Send data to RadioButton')
  public clickOn() {
    return this.inputField().check();
  }

  @stepDecorator('Get data from input')
  public getData(): Chainable<{ state?: boolean, label?: string }> {
    const data = {
      state: null,
      label: '',
    };

    return this.root()
      .then($input => {
        data.label = $input.find('label').text();
        data.state = $input.get(0).querySelector('input').checked;
        return data;
      });
  }
}

export {RadioButtonElement};
