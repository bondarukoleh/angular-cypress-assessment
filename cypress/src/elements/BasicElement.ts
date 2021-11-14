import Chainable = Cypress.Chainable;
import {stepDecorator} from '../../support/helpers/reporter';
import {GetJQueryElement} from '../shared/sharedInterfaces';

class BasicElement {
  constructor(private root: GetJQueryElement) {
  }

  @stepDecorator('Get data from element')
  getData(): Chainable<string> {
    return this.root().invoke('text');
  }

  @stepDecorator('Click on element')
  public clickOn() {
    return this.root().click();
  }

  @stepDecorator('Send data to element')
  public sendKeys(data: string) {
    return this.root().type(data);
  }
}

export {BasicElement};
