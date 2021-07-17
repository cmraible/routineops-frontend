/// <reference types="cypress" />

describe('Account Settings Page', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.login();
            cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });

            cy.visit('/profile/settings');
            cy.viewport(size);
            // Check page title
            cy.title().should('eq', 'Profile');

            cy.get('[data-cy="site-navigation"]').should('be.visible');

            cy.get('[data-cy="account-tabs"]').should('be.visible');

            cy.contains('User Interface Settings').should('be.visible');
            cy.contains('Dark Mode').should('be.visible');
        });
    });

    it('successfully toggles dark mode', () => {
        cy.login();
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile/settings');
        cy.contains('Dark Mode').click();
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                expect(state.ui.darkMode).to.be.true
        });
    });

});