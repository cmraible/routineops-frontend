/// <reference types="cypress" />

describe('Account Billing Free Page', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountFree.json'});
            cy.login();
            cy.viewport(size);
            cy.visit('/account/billing')
            // Check page title
            cy.title().should('eq', 'Account')

            cy.contains('Free').should('be.visible');
            cy.contains('Upgrade to Team').should('be.visible');
        });
    });

    it('links to upgrade Team page', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountFree.json'});
        cy.intercept('GET', '**/prices/**', { fixture: 'fetchPrice.json'});
        cy.intercept('POST', '**/upcoming_invoice**', { fixture: 'fetchUpcomingInvoice.json' });
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.title().should('eq', 'Account')

        cy.contains('Upgrade to Team').should('be.visible').click();
        cy.location('pathname').should('contain', '/account/billing/upgradeTeam');
    });
});