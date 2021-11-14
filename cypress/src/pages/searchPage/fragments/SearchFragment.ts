import {ButtonElement, InputElement, RadioButtonElement} from '../../../elements';
import {stepDecorator} from '../../../../support/helpers/reporter';

class SearchFragment {
  peopleRadioButton = new RadioButtonElement(() => cy.get('#people').parent());
  planetsRadioButton = new RadioButtonElement(() => cy.get('#planets').parent());
  searchButton = new ButtonElement(() => cy.get('button'));
  searchInput = new InputElement(() => this.getSearchField().parent());
  private getSearchField = () => cy.get('#query');

  @stepDecorator('Search For Planets')
  searchForPlanets(planetName: string) {
    this.planetsRadioButton.clickOn();
    this.searchInput.sendKeys({inputValue: planetName});
    this.searchButton.clickOn();
  }

  @stepDecorator('Search For People')
  searchForPeople(name: string) {
    this.peopleRadioButton.clickOn();
    this.searchInput.sendKeys({inputValue: name});
    return this.searchButton.clickOn();
  }

  pressEnter() {
    return this.getSearchField().type('{enter}');
  }
}

export {SearchFragment};
