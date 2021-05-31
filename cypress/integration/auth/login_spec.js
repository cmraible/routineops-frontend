/// <reference types="cypress" />

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('/login/email');
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.viewport(size);

            // Check page title
            cy.title().should('eq', 'Login')

            // Check forgot password link
            cy.contains('Forgot password?')
            .should('have.attr', 'href', '/forgot')
            .should('be.visible');

            // // Check signup link
            // cy.contains('Sign up for Routine Ops')
            //     .should('have.attr', 'href', '/signup')
            //     .should('be.visible');

            // Check email input
            cy.get('input[name="email"]')
                .should('be.visible');

            cy.get('label')
                .contains('Email Address')
                .should('be.visible');

            // Check password input
            cy.get('input[name="password"]')
                .should('be.visible');

            cy.get('label')
                .contains('Password')
                .should('be.visible');

            // Check submit button
            cy.get('button[type="submit"]')
            .contains('Login')
            .should('be.visible');

            // Check the logo
            cy.get('img[alt="logo-square"')
                .should('be.visible');
        });
    });

    it('logs the user in with correct credentials', () => {
        cy.intercept('POST', '**/api/auth/login**', {fixture: 'loginResponse.json'});
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click().should(() => {
            expect(JSON.parse(localStorage.getItem('routineopsState')).auth.token).to.have.lengthOf(40);
            expect(JSON.parse(localStorage.getItem('routineopsState')).auth.userId).to.be.greaterThan(0);
        });
        cy.location('pathname').should('eq', '/');
    });

    it('does not log user in with incorrect credentials', () => {
        cy.intercept('POST', '**/api/auth/login**', {
            statusCode: 400,
            body: {"non_field_errors":["Unable to log in with provided credentials."]}
        });
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password"]').type('password12345');
        cy.get('button[type="submit"]').click();

        cy.location('pathname').should('eq', '/login/email');

        cy.contains('Unable to log in with provided credentials.');
    });

    it('shows error message if server is not reachable', () => {
        cy.intercept('**/login', (req) => {
            req.destroy();
        })

        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.contains('Network Error')
            .should('be.visible');
    });

    it('displays a loading indicator', () => {
        cy.intercept('**/login', (req) => {
            req.reply((res) => {
                res.delay(1000);
            })
        })

        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.get('button[type="submit"]')
            .should('be.disabled')
            .should('have.descendants', 'svg');
    });

    it('validates password before submitting', () => {

        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('button[type="submit"]').click();

        cy.contains('required')
            .should('be.visible');
    });

    it('validates email before submitting', () => {
        cy.get('input[name="email"]').type('chris@routineop');
        cy.get('button[type="submit"]').click();

        cy.contains('Enter a valid email address.')
            .should('be.visible');
    });

})