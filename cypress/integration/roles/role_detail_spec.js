/// <reference types="cypress" />

describe('Role Detail Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.intercept('**/api/roles/1', {
                fixture: 'role.json',
                statusCode: 200
            });
            cy.viewport(size);
            cy.visit('/roles/1');

            // Check the page title
            cy.title().should('eq', 'Role');

            cy.contains('CEO').should('be.visible');

            // Check the action buttons are visible
            cy.get('[data-cy="action"]').should('be.visible');
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');
        });
    })

    it('links back to roles page', () => {
        cy.intercept('**/api/roles/1', {
            fixture: 'role.json',
            statusCode: 200,
        });
        cy.visit('/roles/1')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/roles');
    });

    it('links back to edit page', () => {
        cy.intercept('**/api/roles/1', {
            fixture: 'role.json',
            statusCode: 200,
        });
        cy.visit('/roles/1')
        cy.get('[data-cy="action"]').click();
        cy.location('pathname').should('eq', '/roles/1/edit');
    });

    it('shows network error message if unable to reach server', () => {
        cy.intercept('**/api/roles/**', req => req.destroy());
        cy.visit('/roles/1');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows Not found if the task does not exist.', () => {
        cy.visit('/roles/9999');
        cy.contains('Not found')
            .should('be.visible');
    });
});

