import {pages} from '../../../src/pageObjects';
import {negativeSearchData, noResultData} from '../../../fixtures/negativeSearchData';

describe('People search', () => {
  const {searchPage} = pages;
  const {notExistingName} = negativeSearchData;
  const {notFoundMessage} = noResultData;

  beforeEach(() => {
    searchPage.visit();
  });

  context('Negative scenarios', () => {
    it('should show "Not Found"', () => {
      searchPage.searchFragment.searchForPeople(notExistingName);
      searchPage.notFoundElement.getData().then(results => {
        expect(results).to.eq(notFoundMessage, `Should show "${notFoundMessage}"`);
      });
    });
  });
});
