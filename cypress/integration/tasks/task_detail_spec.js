/// <reference types="cypress" />

describe('Task Detail Page', () => {
    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/tasks/1', {
                statusCode: 200,
                fixture: 'taskHourly.json'
            }).as('taskRequest');
            cy.intercept('GET', '**/api/roles', {
                fixture: 'roles.json',
                statusCode: 200
            });
            cy.viewport(size)
            cy.visit('/tasks/1');

            // Check the browser page title
            cy.title().should('eq', 'Task');

            // Check the action buttons are visible
            cy.get('[data-cy="action"]').should('be.visible');
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('links back to tasks page', () => {
        cy.intercept('GET', '**/api/tasks/1', {
            statusCode: 200,
            fixture: 'taskHourly.json'
        }).as('taskRequest');
        cy.intercept('GET', '**/api/roles', {
            fixture: 'roles.json',
            statusCode: 200
        });
        cy.visit('/tasks/1')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/tasks');
    });

    it('links to edit page', () => {
        cy.intercept('GET', '**/api/tasks/1', {
            statusCode: 200,
            fixture: 'taskHourly.json'
        }).as('taskRequest');
        cy.intercept('GET', '**/api/roles', {
            fixture: 'roles.json',
            statusCode: 200
        });
        cy.visit('/tasks/1')
        cy.get('[data-cy="action"]').click();
        cy.location('pathname').should('eq', '/tasks/1/edit');
    });

    it('shows network error message if unable to reach server', () => {
        cy.intercept('**/api/tasks/**', req => req.destroy());
        cy.intercept('**/api/roles/**', req => req.destroy())
        cy.visit('/tasks/1');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows Not found if the task does not exist.', () => {
        cy.visit('/tasks/9999');
        cy.contains('Not found')
            .should('be.visible');
    });
});