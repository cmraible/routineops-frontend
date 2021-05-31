/// <reference types="cypress" />

describe('Routine Detail Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
            cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
            cy.viewport(size)
            cy.visit('/routines/1');

            // Check the browser page title
            cy.title().should('eq', 'Routine');

            // Check the action buttons are visible
            cy.get('[data-cy="action"]').should('be.visible');
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('links back to routines page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/', {body: {}});
        cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines/1')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/routines');
    });

    it('links to edit page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines/1')
        cy.get('[data-cy="action"]').click();
        cy.location('pathname').should('eq', '/routines/1/edit');
    });

    it('shows network error message if unable to reach server', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('**/api/routines/**', req => req.destroy());
        cy.intercept('**/api/roles/**', req => req.destroy())
        cy.visit('/routines/1');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows Not found if the routine does not exist.', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/**', {
            statusCode: 404,
            body: { detail: "Not found." }
        });
        cy.visit('/routines/9999');
        cy.contains('Not found')
            .should('be.visible');
    });
});