import Chainable = Cypress.Chainable;
import {stepDecorator} from '../../support/helpers/reporter';
import {GetJQueryElement} from '../shared/sharedInterfaces';

class ButtonElement {
  constructor(private root: GetJQueryElement) {
  }

  @stepDecorator('GetData from button')
  getData(): Chainable<{ text: string }> {
    const data = {
      /* Here we can add info if button is disabled, color, etc. */
      text: ''
    };

    return this.root()
      .then($input => {
        data.text = $input.text();
        return data;
      });
  }

  @stepDecorator('ClickOn button')
  public clickOn() {
    return this.root().click();
  }
}

export {ButtonElement};
