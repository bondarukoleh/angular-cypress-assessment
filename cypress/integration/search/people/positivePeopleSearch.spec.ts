import {pages} from '../../../src/pageObjects';
import {darthMaul, darthVader, lukeSkywalker} from '../../../fixtures/people';

describe('People search', () => {
  const {searchPage} = pages;
  const commonPeopleName = 'Darth';

  beforeEach(() => {
    searchPage.visit();
  });

  context('Positive scenarios', () => {
    it('should find one person', () => {
      searchPage.searchFragment.searchForPeople(lukeSkywalker.name);
      searchPage.resultsFragment.getPeopleSearchResults().then(results => {
        expect(results.length).to.eq(1, `Should find one person, found "${results.length}"`);
      });
    });

    it('should find several persons', () => {
      searchPage.searchFragment.searchForPeople(commonPeopleName);
      searchPage.resultsFragment.getPeopleSearchResults().then(results => {
        expect(results.length).be.above(1, `Should find more than one person`);
      });
    });

    it('should show correct person data', () => {
      searchPage.searchFragment.searchForPeople(lukeSkywalker.name);
      searchPage.resultsFragment.getPeopleSearchResults().then(results => {
        expect(results[0]).to.eql(lukeSkywalker, `Search result showed incorrect data for ${lukeSkywalker.name}`);
      });
    });

    it('should show correct person data for several people', () => {
      searchPage.searchFragment.searchForPeople(commonPeopleName);
      searchPage.resultsFragment.getPeopleSearchResults().then(results => {
        const firstPerson = results.find(person => person.name === darthVader.name);
        const secondPerson = results.find(person => person.name === darthMaul.name);
        expect(firstPerson).to.eql(darthVader, `Search result showed incorrect data for ${darthVader.name}`);
        expect(secondPerson).to.eql(darthMaul, `Search result showed incorrect data for ${darthMaul.name}`);
      });
    });
  });
});
