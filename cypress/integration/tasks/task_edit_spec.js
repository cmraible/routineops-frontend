/// <reference types="cypress" />

describe('Task Edit Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/tasks/1', { fixture: 'taskHourly.json' }).as('taskRequest');
            cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
            cy.viewport(size);
            cy.visit('/tasks/1/edit');

            // Check the browser page title
            cy.title().should('eq', 'Edit Task');

            // Check Primary and secondary buttons are visible
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the name field
            cy.get('input[name="name"]')
                .should('be.visible')
                .should('have.value', 'Hourly Task');
            cy.get('textarea[name="description"]')
                .should('be.visible')
                .should('have.value', 'This is a fake task');
            cy.get('button[type="submit"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully edits a task', () => {
        var i = 0
        cy.intercept('GET', '**/api/tasks/1', (req) => {
            if (i === 0) {
                req.reply({
                    statusCode: 200,
                    fixture: 'taskHourly.json'
                })
            } else {
                req.reply({
                    statusCode: 200,
                    fixture: 'taskHourlyEdited.json'
                })
            }
            i++
        });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('PATCH', '**/api/tasks/**', { fixture: 'taskHourlyEdited.json' }).as('updateRequest');
        cy.visit('/tasks/1/edit');
        // Check the name field
        cy.get('input[name="name"]').click().type(' Edited', {force: true})
        cy.get('textarea[name="description"]');
        cy.get('form#task-form').submit();
        cy.wait('@updateRequest').then(() => {
            cy.window()
                .its('store')
                .invoke('getState')
                .its('tasks')
                .its('entities')
                .its('1')
                .its('name')
                .should('eq', 'Hourly Task Edited');
        });
    });

    it('displays server validated errors', () => {
        cy.intercept('GET', '**/api/tasks/1', { fixture: 'taskHourly.json' }).as('taskRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('PATCH', '**/api/tasks/1**', {
            body: {"name":["Ensure this field has no more than 255 characters."]},
            statusCode: 400
        });
        cy.visit('/tasks/1/edit');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type(
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            {force: true, delay: 1}
        );
        cy.get('form#task-form').submit();
        cy.contains('Ensure this field has no more than 255 characters.');
    });

    it('links back to task page', () => {
        cy.intercept('GET', '**/api/tasks/1', { fixture: 'taskHourly.json' }).as('taskRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/tasks/1/edit')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/tasks/1');
    });

    it('shows Not found if the task does not exist.', () => {
        cy.intercept('GET', '**/api/tasks/**', {
            statusCode: 404,
            body: {detail: "Not found."}
        })
        cy.visit('/tasks/9999/edit');
        cy.contains('Not found')
            .should('be.visible');
    });

    it('shows network error message if unable to reach server (update)', () => {
        cy.intercept('GET', '**/api/tasks/1', { fixture: 'taskHourly.json' }).as('taskRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('PATCH', '**/api/tasks/**', req => req.destroy());
        cy.visit('tasks/1/edit');
        cy.get('input[name="name"]').click().type(' CHEESE', {force: true});
        cy.get('form#task-form').submit();
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows network error message if unable to reach server (fetch)', () => {
        cy.intercept('**/api/tasks/**', req => req.destroy());
        cy.intercept('**/api/roles/**', req => req.destroy());
        cy.visit('/tasks/1/edit');
        cy.contains('Network Error')
            .should('be.visible');
    });


});