// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
/// <reference types="@shelex/cypress-allure-plugin" />
import * as allureWriter from '@shelex/cypress-allure-plugin/writer';

module.exports = (on, config) => {
  if (config.env.allure) {
    // @ts-ignore
    allureWriter(on, config);
  }

  return config;
};
