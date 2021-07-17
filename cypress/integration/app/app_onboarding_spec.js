/// <reference types="cypress" />


describe('Account Billing Free Page', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountFree.json'});
            //cy.intercept('**/api/auth/login**', { fixture: 'loginResponseNewUser.json' }).as('loginRequest');
            cy.loginStubbed(false, 'loginResponseNewUser.json');
            cy.viewport(size);
        });
    });

});