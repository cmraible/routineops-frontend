/// <reference types="cypress" />

const { PhoneNumberFormat } = require("google-libphonenumber");

describe('Role List Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/roles', {
                fixture: 'roles.json',
                statusCode: 200
            });
            cy.viewport(size);

            cy.visit('/roles');

            // Check browser page title
            cy.title().should('eq', 'Roles');

            // Check the displayed page title
            cy.contains('Roles').should('be.visible');

            // Check the role input is displayed
            cy.get('input[name="name"]').should('be.visible');

            // Check the action menu
            cy.get('#action-menu-1').should('be.visible').click();

            cy.contains('Edit').should('be.visible');
            cy.contains('Delete').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

            // Check the back button
            cy.get('[data-cy="previous"]').should('be.visible');
        });
    });

    it('adds a role successfully', () => {
        cy.intercept('GET', '**/api/roles', {
            body: {},
            statusCode: 200
        });
        cy.intercept('POST', '**/api/roles', {
            fixture: 'role.json',
            statusCode: 200
        });
        cy.visit('/roles');
        cy.get('input[name="name"]').type('CEO').type('{enter}');
        cy.contains('CEO').should('be.visible');
    });

    it('deletes a role successfully', () => {
        cy.intercept('GET', '**/api/roles', {
            fixture: 'roles.json',
            statusCode: 200
        });
        cy.intercept('DELETE', '**/api/roles/4', {
            body: 4,
            statusCode: 204
        });
        // Pre-populate a role
        cy.visit('/roles');
        // Delete the role
        cy.get('#action-menu-4').click();
        cy.contains('Delete').should('be.visible').click();
        // Assert that everything worked
        cy.get('ul li').should('have.length', 3);
        cy.window()
            .its('store')
            .invoke('getState')
            .its('roles')
            .its('ids')
            .should('have.length', 3);
    });

    it('links to edit role', () => {
        // Pre-populate a role
        cy.intercept('GET', '**/api/roles', {
            fixture: 'roles.json',
            statusCode: 200
        });
        cy.visit('/roles');
        // Delete the role
        cy.get('#action-menu-1').click();
        cy.contains('Edit').should('be.visible').click();
        // Assert that everything worked
        cy.location('pathname').should('eq', '/roles/1/edit');
    });

    it('shows No roles found if there are no roles', () => {
        cy.intercept('GET', '**/api/roles', {
            body: {},
            statusCode: 200
        });
        cy.visit('/roles');
        // Check the "No Roles Found" message
        cy.contains('No roles found.').should('be.visible');
    });

    it('links back to the Team page', () => {
        cy.visit('/roles');
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/team');
    });

    it('requires the name field', () => {
        cy.visit('/roles');
        cy.get('input[name="name"]').clear().type('{enter}');
        cy.contains('required');
    });

    it('shows error message if unable to add role', () => {
        cy.intercept('GET', '**/api/roles', {
            statusCode: 200,
            body: {}
        })
        cy.intercept('POST', '**/api/roles', req => req.destroy())
        cy.visit('/roles');
        cy.get('input[name="name"]').type('Fake role number 2').type('{enter}');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows error message if unable to fetch roles', () => {
        cy.intercept('GET', '**/api/roles', req => req.destroy());
        cy.visit('/roles');
        cy.contains('Network Error')
            .should('be.visible');
    });
})