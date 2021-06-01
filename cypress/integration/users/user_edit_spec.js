/// <reference types="cypress" />

describe('User Edit Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/users/1', {
                fixture: 'user.json'
            });
            cy.viewport(size);
            cy.visit('users/1/edit');

            // Check the page title
            cy.title().should('eq', 'Edit User');

            // Check the action buttons are visible
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the form is rendered
            cy.get('input[name="first_name"]').should('be.visible');
            cy.get('input[name="last_name"]').should('be.visible');
            cy.get('input[name="email"]').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');


            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully edits the user', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        var i = 0
        cy.intercept('GET', '**/api/users/1**', (req) => {
            if (i === 0) {
                req.reply({
                    statusCode: 200,
                    fixture: 'user.json'
                })
            } else {
                req.reply({
                    statusCode: 200,
                    fixture: 'userEdited.json'
                })
            }
            i++
        });
        cy.intercept('PATCH', '**/api/users/1**', { fixture: 'userEdited.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles', {});
        cy.visit('users/1/edit');

        // Check the form is rendered
        cy.get('input[name="first_name"]').click().type('topher');
        cy.get('input[name="last_name"]').clear().type('Jones');
        cy.get('button[type="submit"]').click();

        cy.window()
            .its('store')
            .invoke('getState')
            .its('users')
            .its('entities')
            .its(1)
            .its('first_name')
            .should('eq', 'Christopher');

        cy.window()
            .its('store')
            .invoke('getState')
            .its('users')
            .its('entities')
            .its(1)
            .its('last_name')
            .should('eq', 'Jones');

    });

    it('links back to the user page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles', {});
        cy.visit('users/1/edit');
        cy.get('[data-cy="previous"]').click();

        cy.location('pathname').should('eq', '/users/1');
    })

    it('validates the email address', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.visit('users/1/edit');

        // Check the form is rendered
        cy.get('input[name="email"]').clear().type('john@chris');
        cy.get('button[type="submit"]').click();

        cy.contains('Enter a valid email address.');

    });

    it('displays field level API errors', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.intercept('PATCH', '**/api/users/1', {
            body: { first_name: ["Ensure this field has no more than 150 characters."]},
            statusCode: 400
        });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles', {});
        cy.visit('users/1/edit');

        // Check the form is rendered
        cy.get('input[name="first_name"]').clear().type('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', {timeout: 1000000});
        cy.get('button[type="submit"]').click();

        cy.contains('Ensure this field has no more than 150 characters.');

    });

    it('shows network error message if unable to reach server (update)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.visit('users/1/edit');
        cy.intercept('**/api/users/**', req => req.destroy());
        cy.get('input[name="first_name"]').click().type(' CHEESE', {force: true});
        cy.get('form#user-form').submit();

        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows network error message if unable to reach server (fetch)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('**/api/users/**', req => req.destroy());
        cy.visit('/users/1/edit');
        cy.contains('Network Error')
            .should('be.visible');
    });
});