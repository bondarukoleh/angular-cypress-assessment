import Chainable = Cypress.Chainable;

type GetJQueryElement = () => Chainable<JQuery<HTMLElement>>;

interface TPeople {
  name: string;
  gender: string;
  birthyear: string;
  eyecolor: string;
  skincolor: string;
}

interface TPlanet {
  name: string;
  population: string;
  climate: string;
  gravity: string;
}

export {GetJQueryElement, TPeople, TPlanet};
