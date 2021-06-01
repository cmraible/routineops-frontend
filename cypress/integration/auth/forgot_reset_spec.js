/// <reference types="cypress" />

describe('Reset password page', () => {
    beforeEach(() => {
        cy.visit('/reset/id/token');
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.viewport(size);

            // Check page title
            cy.title().should('eq', 'Reset Password')

            // Check login link
            cy.contains('Back to Login')
            .should('have.attr', 'href', '/login')
            .should('be.visible');

            // // Check signup link
            // cy.contains('Sign up for Routine Ops')
            //     .should('have.attr', 'href', '/signup')
            //     .should('be.visible');

            // Check password inputs
            cy.get('input[name="new_password1"]')
                .should('be.visible');
            cy.get('input[name="new_password1"]')
                .should('be.visible');

            cy.get('label')
                .contains('Create password')
                .should('be.visible');
            cy.get('label')
                .contains('Confirm password')
                .should('be.visible');

            // Check submit button
            cy.get('button[type="submit"]')
            .contains('Reset Password')
            .should('be.visible');

            // Check the logo
            cy.get('img[alt="logo-square"]')
                .should('be.visible');
        });
    });

    it('displays a loading indicator', () => {
        // Configure route with a delay
        cy.intercept('**/auth/password/reset/confirm/', (req) => {
            req.reply((res) => {
                res.delay(1000);
            })
        })

        // Type in email and submit form
        cy.get('input[name="new_password1"]').type('password1234');
        cy.get('input[name="new_password2"]').type('password1234');
        cy.get('button[type="submit"]').click();

        // Assert button is disabled and svg spinner is shown
        cy.get('button[type="submit"]')
            .should('be.disabled')
            .should('have.descendants', 'svg');
    });

    it('does not accept invalid token', () => {
        cy.intercept('POST', '**/api/auth/password/reset/confirm**', {
            statusCode: 400,
            body: {"uid":["Invalid value"]}
        });

        // Type in email and submit form
        cy.get('input[name="new_password1"]').type('password1234');
        cy.get('input[name="new_password2"]').type('password1234');
        cy.get('button[type="submit"]').click();

        // Assert button is disabled and svg spinner is shown
        cy.contains('Invalid reset link.');
    });

    it('validates the password is > 9 characters', () => {

        // Type in email and submit form
        cy.get('input[name="new_password1"]').type('password');
        cy.get('input[name="new_password2"]').type('password');
        cy.get('button[type="submit"]').click();

        // Assert button is disabled and svg spinner is shown
        cy.contains('Passwords must be at least 9 characters long.');
    });

    it('validates the passwords match', () => {

        // Type in email and submit form
        cy.get('input[name="new_password1"]').type('password1234');
        cy.get('input[name="new_password2"]').type('password12345');
        cy.get('button[type="submit"]').click();

        // Assert button is disabled and svg spinner is shown
        cy.contains('Passwords do not match.');
    });

    it('does accept a valid token (stubbed)', () => {
        // Had to stub this out because there is no way that I found to
        // get the reset link that is emailed into the context of the tests
        // Entire flow is covered in backend integration tests to ensure that
        // sending the link and using the link is successful.
        cy.intercept('POST', '**/api/auth/password/reset/confirm', {
            body: { detail: 'Password reset.'}
        })
        // Type in email and submit form
        cy.get('input[name="new_password1"]').type('password1234');
        cy.get('input[name="new_password2"]').type('password1234');
        cy.get('button[type="submit"]').click();
        // Assert button is disabled and svg spinner is shown
        cy.contains('Your password has been reset.');
    });

    it('shows error message if server is not reachable', () => {
        cy.intercept('**/auth/password/reset/confirm/', req => req.destroy())

        cy.get('input[name="new_password1"]').type('password1234');
        cy.get('input[name="new_password2"]').type('password1234');
        cy.get('button[type="submit"]').click();

        cy.contains('Network Error')
            .should('be.visible');
    });

})