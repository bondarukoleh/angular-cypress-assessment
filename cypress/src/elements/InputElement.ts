import {GetJQueryElement} from '../shared/sharedInterfaces';
import Chainable = Cypress.Chainable;
import {stepDecorator} from '../../support/helpers/reporter';

class InputElement {
  private inputField: GetJQueryElement;

  constructor(private root: GetJQueryElement) {
    this.inputField = () => this.root().find('input');
  }

  @stepDecorator('Send data to input')
  public sendKeys({inputValue, clear = true}: { inputValue: string, clear?: boolean }) {
    if (clear) {
      this.clear();
      return this.inputField().type(inputValue);
    } else {
      return this.inputField().type(inputValue);
    }
  }

  @stepDecorator('Clear input')
  public clear() {
    return this.inputField().clear({force: true});
  }

  @stepDecorator('Get data from input')
  public getData(): Chainable<{ inputValue?: string, label?: string }> {
    const data = {
      inputValue: '',
      label: '',
    };

    return this.root()
      .then($input => {
        data.label = $input.find('label').text();
        data.inputValue = $input.find('input').text();
        return data;
      });
  }
}

export {InputElement};
