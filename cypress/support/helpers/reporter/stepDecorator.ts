function stepDecorator(name: string) {
  return function (_parentClass, _propertyName: string, propertyDescriptor: PropertyDescriptor) {
    const originalFunction = propertyDescriptor.value;

    if (!Cypress.env('allure')) {
      return propertyDescriptor;
    }

    propertyDescriptor.value = function (...args) {
      // @ts-ignore
      cy.allure().step(name);

      args.forEach((arg) => {
        try {
          cy.allure().parameter('arguments', typeof arg === 'object' ? JSON.stringify(arg) : arg);
        } catch (e) {
          cy.log('Cannot stringify parameter');
          cy.log(arg);
        }
      });
      return originalFunction.apply(this, args);
    };
    return propertyDescriptor;
  };
}

export {stepDecorator};

