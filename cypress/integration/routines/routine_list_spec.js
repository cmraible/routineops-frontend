/// <reference types="cypress" />

describe('Routine List Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' });
            cy.viewport(size)
            cy.visit('/routines');

            // Check the browser page title
            cy.title().should('eq', 'Routines');

            // Check the visible page heading
            cy.contains('Routines');

            // Check the back button and add button
            cy.get('[data-cy="action"]').should('be.visible');

            // Check that the routine item is rendered
            cy.contains('Hourly Routine').should('be.visible');

            // Check the action menu
            cy.get('[data-cy="action-menu-1"]').should('be.visible').click();

            cy.contains('Edit').should('be.visible');
            cy.contains('Delete').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('links to the add routine page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' });
        cy.visit('/routines');
        // Click the add button
        cy.get('[data-cy="action"]').click();
        // Check the URL
        cy.location('pathname').should('eq', '/routines/add');
    });

    it('links to the routine detail page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' });
        cy.visit('/routines');
        // Click the routine item
        cy.contains('Hourly Routine').click();
        // Check the url
        cy.location('pathname').should('eq', '/routines/1');
    })

    it('links to edit routine correctly', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' });
        cy.intercept('GET', '**/api/routines/2', { fixture: 'routineDaily.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines');
        // Delete the role
        cy.get('[data-cy="action-menu-2"]').click();
        cy.contains('Edit').should('be.visible').click();
        // Assert that everything worked
        cy.location('pathname').should('eq', '/routines/2/edit');
    });

    it('deletes a routine successfully', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' });
        cy.intercept('DELETE', '**/api/routines/2', {
            body: 2,
            statusCode: 204
        });
        // Pre-populate a role
        cy.visit('/routines');
        // Delete the role
        cy.get('[data-cy="action-menu-2"]').click();
        cy.contains('Delete').should('be.visible').click();
        cy.contains('Delete Routine').should('be.visible').click();
        cy.window()
            .its('store')
            .invoke('getState')
            .its('routines')
            .its('ids')
            .should('have.length', 5);
    });

    it('shows no routines found if there are no routines', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/', {
            statusCode: 200,
            body: []
        });
        cy.visit('/routines');
        cy.contains("You don't have any routines yet.").should('be.visible');
    });

    it('shows error message if unable to fetch routines', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('**/api/routines', req => req.destroy());
        cy.visit('/routines');
        cy.contains('Unable to fetch routines.')
            .should('be.visible');
    });
});