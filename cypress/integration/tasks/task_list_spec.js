/// <reference types="cypress" />

describe('Task List Page', () => {
    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/tasks', {
                fixture: 'tasks.json',
                statusCode: 200
            });
            cy.viewport(size)
            cy.visit('/tasks');

            // Check the browser page title
            cy.title().should('eq', 'Tasks');

            // Check the visible page heading
            cy.contains('Tasks');

            // Check the back button and add button
            cy.get('[data-cy="action"]').should('be.visible');

            // Check that the task item is rendered
            cy.contains('Hourly Task').should('be.visible');

            // Check the action menu
            cy.get('#action-menu-1').should('be.visible').click();

            cy.contains('Edit').should('be.visible');
            cy.contains('Delete').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('links to the add task page', () => {
        cy.intercept('GET', '**/api/tasks', {
            fixture: 'tasks.json',
            statusCode: 200
        });
        cy.visit('/tasks');
        // Click the add button
        cy.get('[data-cy="action"]').click();
        // Check the URL
        cy.location('pathname').should('eq', '/tasks/add');
    });

    it('links to the task detail page', () => {
        cy.intercept('GET', '**/api/tasks', {
            fixture: 'tasks.json',
            statusCode: 200
        });
        cy.visit('/tasks');
        // Click the task item
        cy.contains('Hourly Task').click();
        // Check the url
        cy.location('pathname').should('eq', '/tasks/1');
    })

    it('links to edit task correctly', () => {
        cy.intercept('GET', '**/api/tasks', {
            fixture: 'tasks.json',
            statusCode: 200
        });
        cy.visit('/tasks');
        // Delete the role
        cy.get('#action-menu-2').click();
        cy.contains('Edit').should('be.visible').click();
        // Assert that everything worked
        cy.location('pathname').should('eq', '/tasks/2/edit');
    });

    it('deletes a task successfully', () => {
        cy.intercept('GET', '**/api/tasks', {
            fixture: 'tasks.json',
            statusCode: 200
        });
        cy.intercept('DELETE', '**/api/tasks/2', {
            body: 2,
            statusCode: 204
        });
        // Pre-populate a role
        cy.visit('/tasks');
        // Delete the role
        cy.get('#action-menu-2').click();
        cy.contains('Delete').should('be.visible').click();
        cy.get('ul li').should('have.length', 5);
        cy.window()
            .its('store')
            .invoke('getState')
            .its('tasks')
            .its('ids')
            .should('have.length', 5);
    });

    it('shows no tasks found if there are no tasks', () => {
        cy.intercept('GET', '**/api/tasks/', {
            statusCode: 200,
            body: []
        });
        cy.visit('/tasks');
        cy.contains("You don't have any tasks yet.").should('be.visible');
    });

    it('shows error message if unable to fetch tasks', () => {
        cy.intercept('**/api/tasks', req => req.destroy());
        cy.visit('/tasks');
        cy.contains('Network Error')
            .should('be.visible');
    });
});