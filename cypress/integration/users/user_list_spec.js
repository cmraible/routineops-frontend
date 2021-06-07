/// <reference types="cypress" />

describe('User List page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/users**', { fixture: 'users.json' });
            cy.intercept('GET', '**/api/invitations**', {statusCode: 200, body: []});
            cy.viewport(size)
            cy.visit('/team');

            // Check browser page title
            cy.title().should('eq', 'Team');

            // Check the displayed page title
            cy.contains('Users').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

            // Check the back button and add button
            // cy.get('[data-cy="action"]').should('be.visible');
            // cy.get('[data-cy="previous"]').should('be.visible');
        });
    });

    it('links to the invite user page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/users**', { fixture: 'users.json' });
        cy.intercept('GET', '**/api/invitations**', {statusCode: 200, body: []});
        cy.visit('/team')
        cy.get('[data-cy="action"]').click();
        cy.contains('Invite User').should('be.visible');
        cy.contains('Send Invitation').should('be.visible');
    });

    it('links to each user detail page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/users**', { fixture: 'users.json' });
        cy.intercept('GET', '**/api/users/1', { fixture: 'user.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/invitations**', {statusCode: 200, body: []});
        cy.intercept('GET', '**/api/userroles', {});
        cy.visit('/team')
        cy.contains('Chris Raible').click()
        cy.location('pathname').should('eq', '/users/1');
    });

    it('shows error message if unable to fetch users', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/invitations**', req => req.destroy());
        cy.intercept('**/api/users', req => req.destroy());
        cy.visit('/team');
        cy.contains('Network Error')
            .should('be.visible');
    });

});