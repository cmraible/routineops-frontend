/// <reference types="cypress" />

describe('App Level Tests', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.login();
            cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
            // Check the tab bar displays everything it should
            cy.viewport(size);
            cy.contains('Routines').should('be.visible');
            cy.contains('Tasks').should('be.visible');
            cy.contains('Account').should('be.visible');
        });
    })


    it('links to the Account page', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.login();
        cy.contains('Account').click();
        cy.location('pathname').should('eq', '/account');
    });

    it('links to the Routines page', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.login();
        cy.intercept('GET', '**/api/routines**', { fixture: 'routines.json' });
        cy.contains('Routines').click();
        cy.location('pathname').should('eq', '/routines');
    });

    it('links to the Tasks page', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.login();
        cy.contains('Tasks').click();
        cy.location('pathname').should('eq', '/');
    });

    it('shows not found page for a fake route (logged in)', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.login();
        cy.visit('/asdfadsfa');
        cy.contains('Not Found').should('be.visible');
    });

    it('redirects to "/" if not found for fake route (logged out)', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/asdfasdfads');
        cy.location('pathname').should('eq', '/');
    });

    it('logs the user out with any 401 response', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.intercept('GET', '**/api/routines**', {
            statusCode: 401
        }).as('request');
        cy.login();
        cy.visit('/routines');
        cy.wait('@request');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                expect(state.auth.token).to.be.undefined;
                expect(state.auth.userId).to.be.undefined;
        });
        cy.contains('Login');
    })
})