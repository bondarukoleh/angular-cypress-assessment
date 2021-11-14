import {pages} from '../../../src/pageObjects';
import {negativeSearchData, noResultData} from '../../../fixtures/negativeSearchData';

describe('Planets search', () => {
  const {searchPage} = pages;
  const {notExistingName} = negativeSearchData;
  const {notFoundMessage} = noResultData;

  beforeEach(() => {
    searchPage.visit();
  });

  context('Negative scenarios', () => {
    it('should show message that there are no results', () => {
      searchPage.searchFragment.searchForPlanets(notExistingName);
      searchPage.notFoundElement.getData().then(results => {
        expect(results).to.eq(notFoundMessage, `Should show "${notFoundMessage}" message`);
      });
    });
  });
});
