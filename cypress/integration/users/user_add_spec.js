/// <reference types="cypress" />

// Network requests not stubbed. User Add considered "business critical"
// Full integration tests

describe('User Add Page', () => {
    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Visit the invite page
            cy.viewport(size);
            cy.visit('/users/invite');

            // Check the page title
            cy.title().should('eq', 'Invite User');

            // Check the action buttons are visible
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the form is displaying properly
            cy.contains('Email Address').should('be.visible');
            cy.get('input[name="email_address"]').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully creates a new invitation', () => {
        cy.visit('/users/invite');
        // Type in an email address
        cy.get('input[name="email_address"]').click().type('admin@routineops.com', {force: true});
        cy.get('form#user-add-form').submit();
        cy.contains('Invite successfully sent to admin@routineops.com.');
    });

    it('links back to the team page', () => {
        cy.visit('/users/invite');
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/team');
    });

    it('validates the email address', () => {
        cy.visit('/users/invite');
        // Type in an email address
        cy.get('input[name="email_address"]').click().type('admin@routineops', {force: true});
        cy.get('form#user-add-form').submit();
        cy.contains('Enter a valid email address.');
    });

    it('shows error message if unable to add the invitation', () => {
        cy.intercept('**/api/invitations/**', (req) => {
            req.destroy();
        });
        cy.visit('/users/invite');
        cy.get('input[name="email_address"]').click().type('admin@routineops.com', {force: true});
        cy.get('form#user-add-form').submit();

        cy.contains('Network Error')
            .should('be.visible');
    });
})