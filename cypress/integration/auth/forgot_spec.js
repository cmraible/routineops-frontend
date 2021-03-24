/// <reference types="cypress" />

describe('Forgot password page', () => {
    beforeEach(() => {
        cy.visit('/forgot');
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.viewport(size);
            // Check page title
            cy.title().should('eq', 'Forgot your password?')

            // Check login link
            cy.contains('Back to Login')
            .should('have.attr', 'href', '/login')
            .should('be.visible');

            // Check signup link
            cy.contains('Sign up for Routine Ops')
                .should('have.attr', 'href', '/signup')
                .should('be.visible');

            // Check email input
            cy.get('input[name="email"]')
                .should('be.visible');

            cy.get('label')
                .contains('Email Address')
                .should('be.visible');

            // Check submit button
            cy.get('button[type="submit"]')
            .contains('Submit')
            .should('be.visible');

            // Check the logo
            cy.get('img[alt="logo-square"]')
                .should('be.visible');
        });
    });

    it('validates email address', () => {

        // Type in an invalid email address
        cy.get('input[name="email"]')
            .type('chris@routine');

        // Submit the form
        cy.get('button[type="submit"]')
            .click();

        // Assert error message is shown
        cy.contains('Enter a valid email address.');
    });

    it('submits the email address and succeeds', () => {
        // Type in a valid email address
        cy.get('input[name="email"]')
            .type('chris@routineops.com');

        // Submit the form
        cy.get('button[type="submit"]')
            .click();

        // Assert the success message
        cy.contains('Great. If an account matches that email address, you should receive a reset link in a few minutes.');
    });

    it('pretends to succeed for a non-existent email address', () => {
        // Type in a valid email address
        cy.get('input[name="email"]')
            .type('test12345@routineops.com');

        // Submit the form
        cy.get('button[type="submit"]')
            .click();

        // Assert the success message
        cy.contains('Great. If an account matches that email address, you should receive a reset link in a few minutes.');
    })

    it('displays a loading indicator', () => {
        // Configure route with a delay
        cy.intercept('**/auth/password/reset', (req) => {
            req.reply((res) => {
                res.delay(1000);
            })
        })

        // Type in email and submit form
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('button[type="submit"]').click();

        // Assert button is disabled and svg spinner is shown
        cy.get('button[type="submit"]')
            .should('be.disabled')
            .should('have.descendants', 'svg');
    });

    it('shows error message if server is not reachable', () => {
        cy.intercept('**/auth/password/reset', req => req.destroy())

        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('button[type="submit"]').click();

        cy.contains('Network Error')
            .should('be.visible');
    });

})