/// <reference types="cypress" />

describe('App Level Tests', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.viewport(size);
            cy.contains('Tasks').should('be.visible');
            cy.contains('Home').should('be.visible');
            cy.contains('Account').should('be.visible');
        });
    })


    it('links to the Account page', () => {
        cy.contains('Account').click();
        cy.location('pathname').should('eq', '/account');
    });

    it('links to the Tasks page', () => {
        cy.contains('Tasks').click();
        cy.location('pathname').should('eq', '/tasks');
    });

    it('links to the Home page', () => {
        cy.contains('Home').click();
        cy.location('pathname').should('eq', '/');
    });
})