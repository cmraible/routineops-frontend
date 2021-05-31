/// <reference types="cypress" />

describe('Role Edit Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/roles/1/', { fixture: 'role.json' });
            // Check the tab bar displays everything it should
            cy.viewport(size);
            cy.visit('/roles/1/edit');

            // Check the page title
            cy.title().should('eq', 'Role');

            // Check Primary and secondary buttons are visible
            cy.get('[data-cy="previous"]').should('be.visible');
            // cy.get('[data-cy="action"]').should('be.visible');

            // Check the name input and submit button are visible
            cy.get('input[name="name"]').should('have.value', 'CEO');
            cy.get('form#role-form').get('button[type="submit"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');
        });
    });

    it('successfully updates the role name', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles/1', { fixture: 'role.json' }).as('getRequest');
        cy.intercept('PATCH', '**/api/roles/1/**', { fixture: 'roleEdited.json' }).as('updateRequest');
        cy.visit('roles/1/edit');
        cy.get('input[name="name"]').click().type(' Edited', {force: true});
        cy.get('form#role-form').submit();
        cy.wait('@updateRequest');
        cy.window()
            .its('store')
            .invoke('getState')
            .its('roles')
            .its('entities')
            .its(1)
            .its('name')
            .should('eq', 'CEO Edited');
    });

    it('shows network error message if unable to reach server (update)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles/1', { fixture: 'role.json' }).as('getRequest');
        cy.visit('roles/1/edit');
        cy.intercept('PATCH', '**/api/roles/**', req => req.destroy());
        cy.get('input[name="name"]').click().type(' CHEESE', {force: true});
        cy.get('form#role-form').submit();
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows network error message if unable to reach server (fetch)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('**/api/roles/**', req => req.destroy());
        cy.visit('/roles/1/edit');
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('validates that name is filled out', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles/1/', { fixture: 'role.json' });
        cy.visit('roles/1/edit');
        cy.get('input[name="name"]').click().clear();
        cy.get('form#role-form').submit();
        cy.contains('required');
    });

    it('links back to role page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('**/api/roles/1', { fixture: 'role.json' });
        cy.visit('/roles/1/edit')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/roles/1');
    });

    it('shows Not found if the role does not exist.', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles/**', {
            statusCode: 404,
            body: {detail: "Not found."}
        });
        cy.visit('/roles/9999/edit');
        cy.contains('Not found')
            .should('be.visible');
    });
});

