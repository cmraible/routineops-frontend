/// <reference types="cypress" />

describe('Task Add Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.viewport(size)
            cy.visit('/tasks/add');

            // Check the browser page title
            cy.title().should('eq', 'Add Task');

            // Check the name field
            cy.get('input[name="name"]').should('be.visible');
            cy.get('textarea[name="description"]').should('be.visible');
            cy.get('input[name="role"]').should('be.visible');
            cy.get('input[name="label"]').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully adds a task (Hourly)', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/tasks', { fixture: 'tasks.json' }).as('taskRequest')
        cy.intercept('POST', '**/api/tasks/**', {
            statusCode: 201,
            fixture: 'taskHourly.json'
        }).as('taskRequest')
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Hourly Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Hourly').click();
        cy.get('form#task-form').submit();
        cy.wait('@taskRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/tasks');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const task = state.tasks.entities[1];
                expect(task.name).to.eq('Hourly Task');
                expect(task.description).to.eq('This is a fake task');
            });
    });

    it('successfully adds a task (Daily)', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/tasks', { fixture: 'tasks.json' }).as('taskRequest')
        cy.intercept('POST', '**/api/tasks/**', {
            statusCode: 201,
            fixture: 'taskDaily.json'
        });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Daily Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Daily').click();
        cy.get('form#task-form').submit();
        cy.wait('@taskRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/tasks');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const task = state.tasks.entities[2];
                expect(task.name).to.eq('Daily Task');
                expect(task.description).to.eq('This is a fake task');
            });
    });

    it('successfully adds a task (Weekly)', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/tasks', { fixture: 'tasks.json' }).as('taskRequest')
        cy.intercept('POST', '**/api/tasks/**', {
            statusCode: 201,
            fixture: 'taskWeekly.json'
        });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Weekly Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Weekly').click();
        cy.get('form#task-form').submit();
        cy.wait('@taskRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/tasks');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const task = state.tasks.entities[3];
                expect(task.name).to.eq('Weekly Task');
                expect(task.description).to.eq('This is a fake task');
            });
    });

    it('successfully adds a task (Bi-Weekly)', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/tasks', { fixture: 'tasks.json' }).as('taskRequest')
        cy.intercept('POST', '**/api/tasks/**', {
            statusCode: 201,
            fixture: 'taskBiweekly.json'
        });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Biweekly Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Bi-Weekly').click();
        cy.get('form#task-form').submit();
        cy.wait('@taskRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/tasks');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const task = state.tasks.entities[4];
                expect(task.name).to.eq('Biweekly Task');
                expect(task.description).to.eq('This is a fake task');
            });
    });

    it('successfully adds a task (Monthly)', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/tasks', { fixture: 'tasks.json' }).as('taskRequest')
        cy.intercept('POST', '**/api/tasks/**', {
            statusCode: 201,
            fixture: 'taskMonthly.json'
        });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Monthly Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Monthly').click();
        cy.get('form#task-form').submit();
        cy.wait('@taskRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/tasks');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const task = state.tasks.entities[5];
                expect(task.name).to.eq('Monthly Task');
                expect(task.description).to.eq('This is a fake task');
            });
    });

    it('successfully adds a task (Yearly)', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/tasks', { fixture: 'tasks.json' }).as('taskRequest')
        cy.intercept('POST', '**/api/tasks/**', {
            statusCode: 201,
            fixture: 'taskMonthly.json'
        });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Yearly Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Yearly').click();
        cy.get('form#task-form').submit();
        cy.wait('@taskRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/tasks');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const task = state.tasks.entities[6];
                expect(task.name).to.eq('Yearly Task');
                expect(task.description).to.eq('This is a fake task');
            });
    });

    it('requires the name field', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Hourly').click();
        cy.get('form#task-form').submit();
        cy.contains('required')
    });

    it('requires the role field', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Fake Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="label"]').click();
        cy.contains('Hourly').click();
        cy.get('form#task-form').submit();

        cy.contains('required')
    });

    it('requires the frequency/label field', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Fake Task', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake task', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('form#task-form').submit();
        cy.contains('required')
    });

    it('links back to the Tasks page', () => {
        cy.intercept('GET', '**/api/tasks**', {body: {}})
        cy.visit('/tasks/add');
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/tasks');
    });

    it('displays server validated errors', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('POST', '**/api/tasks/**', {
            body: {name: ["Ensure this field has no more than 255 characters."]},
            statusCode: 400
        });
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type(
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            {force: true, delay: 1}
        );
        cy.get('textarea[name="description"]').type('This is a fake task');
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Weekly').click();
        cy.get('form#task-form').submit();
        cy.contains('Ensure this field has no more than 255 characters.');
    });

    it('shows error message if unable to add task', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('**/api/tasks/**', req => req.destroy());
        cy.visit('/tasks/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Fake Task', {force: true});
        cy.get('textarea[name="description"]').type('This is a fake task');
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Weekly').click();
        cy.get('form#task-form').submit();
        cy.contains('Network Error')
            .should('be.visible');
    });

});