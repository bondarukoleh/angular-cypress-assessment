import {pages} from '../../../src/pageObjects';
import {alderaan, kashyyyk, kamino} from '../../../fixtures/planets';

describe('Planets search', () => {
  const {searchPage} = pages;
  const commonPlanetName = 'Ka';

  beforeEach(() => {
    searchPage.visit();
  });

  context('Positive scenarios', () => {
    it('should find one planet', () => {
      searchPage.searchFragment.searchForPlanets(alderaan.name);
      searchPage.resultsFragment.getPlanetsSearchResults().then(results => {
        expect(results.length).to.eq(1, `Should find one planet, found "${results.length}"`);
      });
    });

    it('should find several planets', () => {
      searchPage.searchFragment.searchForPlanets(commonPlanetName);
      searchPage.resultsFragment.getPeopleSearchResults().then(results => {
        expect(results.length).be.above(1, `Should find more than one planet`);
      });
    });

    it('should show correct planet data', () => {
      searchPage.searchFragment.searchForPlanets(alderaan.name);
      searchPage.resultsFragment.getPeopleSearchResults().then(results => {
        expect(results[0]).to.eql(alderaan, `Search result showed incorrect data for ${alderaan.name}`);
      });
    });

    it('should show correct planet data for several planets', () => {
      searchPage.searchFragment.searchForPlanets(commonPlanetName);
      searchPage.resultsFragment.getPlanetsSearchResults().then(results => {
        const firstPlanet = results.find(planet => planet.name === kashyyyk.name);
        const secondPlanet = results.find(planet => planet.name === kamino.name);
        expect(firstPlanet).to.eql(kashyyyk, `Search result showed incorrect data for ${kashyyyk.name}`);
        expect(secondPlanet).to.eql(kamino, `Search result showed incorrect data for ${kamino.name}`);
      });
    });
  });
});
