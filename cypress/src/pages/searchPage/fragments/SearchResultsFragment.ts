import Chainable = Cypress.Chainable;
import {stepDecorator} from '../../../../support/helpers/reporter/stepDecorator';
import {TPeople, TPlanet} from '../../../shared/sharedInterfaces';

class SearchResultsFragment {
  private root = () => cy.get('#search_results');

  private createSearchResultObject<T>(card: Element) {
    const singleSearchResult = {name: ''};
    singleSearchResult.name = card.querySelector('.card-subtitle').textContent;
    const rows = Array.from(card.querySelectorAll('.row'));
    return rows.reduce((accResult, currentRow) => {
      /* TODO: Easy to break, need to add more ids to the html code for robustness */
      const propertyName = currentRow.querySelector('.col-sm-2')
        .textContent.toLowerCase().replace(':', '').replace(/\s/, '');
      const propertyValue = currentRow.querySelector('.col-sm-10').textContent.trim();

      accResult[propertyName] = propertyValue;
      return accResult;
    }, singleSearchResult) as unknown as T[];
  }

  private getSearchResults<T>(): Chainable<T[]> {
    return this.root()
      .then($searchResults => {
        const searchResultElements = Array.from($searchResults.get(0).querySelectorAll('.card'));
        if (!searchResultElements.length) {
          return [];
        }
        return (searchResultElements.map((card) => this.createSearchResultObject<T>(card)) as unknown as T[]);
      });
  }

  @stepDecorator('Get Planets Search Results')
  getPlanetsSearchResults() {
    return this.getSearchResults<TPlanet>();
  }

  @stepDecorator('Get People Search Results')
  getPeopleSearchResults() {
    return this.getSearchResults<TPeople>();
  }
}

export {SearchResultsFragment};
