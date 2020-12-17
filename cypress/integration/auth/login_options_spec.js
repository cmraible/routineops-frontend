/// <reference types="cypress" />

describe('Login Options page', () => {
    beforeEach(() => {
        // cy.exec('npm run initdb')
        cy.visit('/login');
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.viewport(size);

            // Check page title
            cy.title().should('eq', 'Login')

            // Check signup link
            cy.contains('Sign up for Routine Ops')
                .should('have.attr', 'href', '/signup')
                .should('be.visible');

            // Check the logo
            cy.get('img[alt="logo-square"')
                .should('be.visible');

            // Check the login buttons
            cy.contains('Sign in with Email').should('be.visible');
            cy.contains('Sign in with Google').should('be.visible');
        });
    });

    it('links to the email login page', () => {
        cy.contains('Sign in with Email').click();
        cy.location('pathname').should('eq', '/login/email');
    })

})