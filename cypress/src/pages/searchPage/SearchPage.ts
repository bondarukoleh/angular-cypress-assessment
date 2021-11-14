import {SearchResultsFragment, SearchFragment} from './fragments';
import {BasicElement} from '../../elements';
import {stepDecorator} from '../../../support/helpers/reporter';

class SearchPage {
  resultsFragment = new SearchResultsFragment();
  searchFragment = new SearchFragment();
  notFoundElement = new BasicElement(() => cy.get('#not_found'));

  @stepDecorator('Visiting Search Page')
  visit() {
    cy.visit('/');
  }
}

export {SearchPage};
