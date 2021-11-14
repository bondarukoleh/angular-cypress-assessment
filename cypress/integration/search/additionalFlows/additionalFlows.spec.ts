import {pages} from '../../../src/pageObjects';
import {alderaan} from '../../../fixtures/planets';
import {lukeSkywalker} from '../../../fixtures/people';
import {negativeSearchData, noResultData} from '../../../fixtures/negativeSearchData';

describe('Additional flows', () => {
  const {searchPage} = pages;
  const {specialCharacters, longName} = negativeSearchData;
  const {notFoundMessage} = noResultData;

  beforeEach(() => {
    searchPage.visit();
  });

  it('should have initial state without any result', () => {
    searchPage.resultsFragment.getPlanetsSearchResults().then(results => {
      expect(results.length).to.eq(0, `Search results should be clear for initial state`);
    });
  });

  it('should clear previous search results if search field is empty', () => {
    searchPage.searchFragment.searchForPlanets(alderaan.name);
    searchPage.searchFragment.searchInput.clear();
    searchPage.searchFragment.searchButton.clickOn();
    searchPage.resultsFragment.getPlanetsSearchResults().then(results => {
      expect(results.length).to.eq(0, `Previous results should be cleared`);
    });
  });

  it.only('should search with enter key pressed', () => {
    cy.debug();
    searchPage.searchFragment.planetsRadioButton.clickOn();
    searchPage.searchFragment.searchInput.sendKeys({inputValue: alderaan.name});
    searchPage.searchFragment.pressEnter();
    searchPage.resultsFragment.getPlanetsSearchResults().then(results => {
      expect(results.length).to.eq(1, `Enter key should work`);
    });
  });

  it('should switch between searches', () => {
    searchPage.searchFragment.searchForPlanets(alderaan.name);
    searchPage.resultsFragment.getPeopleSearchResults().then(results => {
      expect(results[0]).to.eql(alderaan, `Search result showed incorrect data for ${alderaan.name}`);
    });

    searchPage.searchFragment.searchForPeople(lukeSkywalker.name);
    searchPage.resultsFragment.getPeopleSearchResults().then(results => {
      expect(results[0]).to.eql(lukeSkywalker, `Search result showed incorrect data for ${lukeSkywalker.name}`);
    });
  });

  it('should not crash if searched with special characters', () => {
    searchPage.searchFragment.searchForPeople(specialCharacters);
    searchPage.notFoundElement.getData().then(results => {
      expect(results).to.eq(notFoundMessage, `Should show "${notFoundMessage}"`);
    });
  });

  it('should not crash if searched with long name', () => {
    searchPage.searchFragment.searchForPlanets(longName);
    searchPage.notFoundElement.getData().then(results => {
      expect(results).to.eq(notFoundMessage, `Should show "${notFoundMessage}"`);
    });
  });
});
