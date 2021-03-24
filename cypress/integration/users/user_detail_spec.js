/// <reference types="cypress" />

describe('User Detail Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/users/1', {
                fixture: 'user.json'
            });
            cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
            cy.intercept('GET', '**/api/userroles/**', {
                body: {}
            });
            cy.viewport(size)
            cy.visit('/users/1');

            // Check the page title
            cy.title().should('eq', 'Chris Raible');

            // Check the Roles title and select
            cy.contains('Roles').should('be.visible');
            cy.get('#role-select').should('be.visible');

            // Check the action buttons are visible
            cy.get('[data-cy="action"]').should('be.visible');
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully adds and deletes a userRole', () => {
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles/**', {
            body: {}
        });
        cy.intercept('POST', '**/api/userroles/', {
            fixture: 'userRole.json',
            statusCode: 201
        });
        cy.intercept('DELETE', '**/api/userroles/1', {
            body: 1,
            statusCode: 204
        });
        cy.visit('/users/1');
        cy.get('#role-select').click();
        cy.contains('CEO').should('be.visible').click();
        cy.contains('CEO').should('be.visible');
        cy.window()
            .its('store')
            .invoke('getState')
            .its('userRoles')
            .its('ids')
            .should('have.length', 1);

        cy.get('#delete-userrole-1').click();
        cy.window()
            .its('store')
            .invoke('getState')
            .its('userRoles')
            .its('ids')
            .should('have.length', 0);
    })

    it('links back to users page', () => {
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.intercept('GET', '**/users', { fixture: 'users.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles', {});
        cy.visit('/users/1')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/users');
    });

    it('links back to edit page', () => {
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles', {});
        cy.visit('/users/1')
        cy.get('[data-cy="action"]').click();
        cy.location('pathname').should('eq', '/users/1/edit');
    });

    it('shows error message if unable to fetch user', () => {
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles/**', {
            body: {}
        });
        cy.intercept('GET', '**/api/users/**', req => req.destroy());
        cy.visit('/users/1');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows error message if unable to add user role', () => {
        cy.intercept('GET', '**/api/users/1', {
            fixture: 'user.json'
        });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/userroles/**', {
            body: {}
        });
        cy.intercept('POST', '**/api/userroles/**', req => req.destroy());
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/users/1');
        cy.get('#role-select').click();
        cy.contains('CEO').should('be.visible').click();
        cy.contains('Network Error')
            .should('be.visible');
    });
});