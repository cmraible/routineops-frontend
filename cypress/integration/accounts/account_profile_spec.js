/// <reference types="cypress" />

describe('Account Profile Page', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/account');
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.viewport(size);
            // Check page title
            cy.title().should('eq', 'Account')
            cy.get('[data-cy="site-navigation"]').should('be.visible');
            cy.contains('Name').should('be.visible');
            cy.contains('Chris Raible').should('be.visible');
            cy.contains('Email Address').should('be.visible');
            cy.contains('chris@routineops.com').should('be.visible');
            cy.contains('Mobile Phone').should('be.visible');
            cy.contains('Password').should('be.visible');
            cy.contains('Change Password').should('be.visible');
            cy.get('[data-cy="account-tabs"]').should('be.visible');
        });
    });


});