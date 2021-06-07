/// <reference types="cypress" />

describe('Role List Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
            cy.viewport(size);

            cy.visit('/team/roles');

            // Check browser page title
            cy.title().should('eq', 'Team');

            // Check the displayed page title
            cy.contains('Roles').should('be.visible');

            // Check the role input is displayed
            cy.get('input[name="name"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');
        });
    });

    it('adds a role successfully', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', {
            body: {},
            statusCode: 200
        });
        cy.intercept('POST', '**/api/roles', {
            fixture: 'role.json',
            statusCode: 200
        });
        cy.visit('/team/roles');
        cy.get('input[name="name"]').type('CEO').type('{enter}');
        cy.contains('CEO').should('be.visible');
    });

    it('deletes a role successfully', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', {
            fixture: 'roles.json',
            statusCode: 200
        });
        cy.intercept('DELETE', '**/api/roles/4', {
            body: 4,
            statusCode: 204
        });
        // Pre-populate a role
        cy.visit('/team/roles');
        // Delete the role
        cy.get('[data-cy="action-menu-4"]').click();
        cy.contains('Delete').should('be.visible').click();
        cy.contains('Delete Role').click();
        // Assert that everything worked
        cy.window()
            .its('store')
            .invoke('getState')
            .its('roles')
            .its('ids')
            .should('have.length', 3);
    });

    it('links to edit role', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        // Pre-populate a role
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/roles/1', { fixture: 'role.json' });
        cy.visit('/team/roles');
        // Delete the role
        cy.get('[data-cy="action-menu-1"]').click();
        cy.contains('Edit').should('be.visible').click();
        // Assert that everything worked
        cy.location('pathname').should('eq', '/roles/1/edit');
    });

    it('shows No roles found if there are no roles', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', {
            body: {}
        });
        cy.visit('/team/roles');
        // Check the "No Roles Found" message
        cy.contains('You don\'t have any roles yet.').should('be.visible');
    });

    it('requires the name field', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', {
            body: {}
        });
        cy.visit('/team/roles');
        cy.get('input[name="name"]').clear().type('{enter}');
        cy.contains('required');
    });

    it('shows error message if unable to add role', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', {
            statusCode: 200,
        })
        cy.intercept('POST', '**/api/roles', req => req.destroy())
        cy.visit('/team/roles');
        cy.get('input[name="name"]').type('Fake role number 2').type('{enter}');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows error message if unable to fetch roles', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', req => req.destroy());
        cy.visit('/team/roles');
        cy.contains('Unable to fetch roles.')
            .should('be.visible');
    });
})