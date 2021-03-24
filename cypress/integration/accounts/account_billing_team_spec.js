/// <reference types="cypress" />

describe('Account Billing Team Page', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountTeam.json'});
            cy.login();
            cy.viewport(size);
            cy.visit('/account/billing')
            // Check page title
            cy.title().should('eq', 'Account')
        });
    });

});