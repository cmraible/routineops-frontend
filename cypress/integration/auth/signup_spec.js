/// <reference types="cypress" />

describe('Signup page', () => {
    beforeEach(() => {
        // cy.exec('npm run initdb')
        cy.visit('/signup');
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            // Check the tab bar displays everything it should
            cy.viewport(size);

            // Check page title
            cy.title().should('eq', 'Sign up')

            // Check login link
            cy.contains('Login')
            .should('have.attr', 'href', '/login')
            .should('be.visible');

            // Check email input
            cy.get('input[name="email"]')
                .should('be.visible');

            cy.get('label')
                .contains('Email Address')
                .should('be.visible');

            // Check password input
            cy.get('input[name="password1"]')
                .should('be.visible');

            cy.get('label')
                .contains('Create password')
                .should('be.visible');

            // Check password input
            cy.get('input[name="password2"]')
                .should('be.visible');

            cy.get('label')
                .contains('Confirm password')
                .should('be.visible');

            // Check Privacy Policy / Terms disclaimer
            cy.get('input[type="checkbox"]')
                .should('have.attr', 'id', 'disclaimer');

            // Check submit button
            cy.get('button[type="submit"]')
            .contains('Sign Up')
            .should('be.visible');

            // Check the logo
            cy.get('img[alt="logo-square"')
                .should('be.visible');
        });
    });

    it('successfully signs up a new user', () => {
        cy.exec('npm run resetdb');
        cy.get('input[name="email"]').type('admin@routineops.com');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password1234');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click().should(() => {
            expect(JSON.parse(localStorage.getItem('routineopsState')).auth.token).to.have.lengthOf(40);
            expect(JSON.parse(localStorage.getItem('routineopsState')).auth.userId).to.be.greaterThan(0);
        });;

        cy.location('pathname').should('eq', '/');
    });

    it('shows error message if server is not reachable', () => {
        cy.intercept('**/auth/register/', req => req.destroy())

        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password1234');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click();

        cy.contains('Network Error')
            .should('be.visible');
    });

    it('displays a loading indicator', () => {
        cy.intercept('**/auth/register/', (req) => {
            req.reply((res) => {
                res.delay(1000);
            })
        })

        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password1234');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click();
        cy.get('button[type="submit"]')
            .should('be.disabled')
            .should('have.descendants', 'svg');
    });

    it('does not allow duplicate email addresses', () => {
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password1234');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click();

        cy.contains('A user is already registered with this e-mail address.')
            .should('be.visible');
    });

    it('validates email before submitting', () => {
        cy.get('input[name="email"]').type('chris@routineop');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password1234');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click();

        cy.contains('Enter a valid email address.')
            .should('be.visible');
    });

    it('validates password length before submitting', () => {
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password1"]').type('password');
        cy.get('input[name="password2"]').type('password');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click();

        cy.contains('Passwords must be at least 9 characters long.')
            .should('be.visible');
    });

    it('validates password match before submitting', () => {
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password12345');
        cy.get('#disclaimer').check({force: true});
        cy.get('button[type="submit"]').click();

        cy.contains('Passwords do not match.')
            .should('be.visible');
    });

    it('validates disclaimer before submitting', () => {
        cy.get('input[name="email"]').type('chris@routineops.com');
        cy.get('input[name="password1"]').type('password1234');
        cy.get('input[name="password2"]').type('password12345');
        cy.get('button[type="submit"]').click();

        cy.contains('required')
            .should('be.visible');
    });
});