/// <reference types="cypress" />

describe('Account Profile Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.viewport(size);
            cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
            cy.visit('/profile');

            // Check page title
            cy.title().should('eq', 'Profile')

            cy.get('[data-cy="site-navigation"]').should('be.visible');

            cy.get('[data-cy="account-tabs"]').should('be.visible');

            cy.contains('Name').should('be.visible');
            cy.contains('Chris Raible').should('be.visible');
            cy.contains('Email Address').should('be.visible');
            cy.contains('chris@routineops.com').should('be.visible');
            cy.contains('Mobile Phone').should('be.visible');
            cy.contains('Password').should('be.visible');
            cy.contains('Change Password').should('be.visible');
        });
    });

    it('successfully edits the users name', () => {
        cy.clock()
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        cy.intercept('PATCH', '**/api/users/1', { fixture: 'userNameEdited.json'})
        cy.contains('Chris Raible').click();
        cy.get('input[name="first_name"]').type('topher');
        cy.get('input[name="last_name"]').type('eeee');
        cy.get('[data-cy="name-form"]').submit();
        cy.contains('Name successfully updated');
        cy.tick(2000);
        cy.get('[data-cy="modal"]').should('not.exist');
        cy.contains('Christopher Raibleeee');
    });

    it('displays errors returned from the api for changing name', () => {
        cy.intercept('PATCH', '**/api/users/1', {
            body: {"first_name": ["Ensure this field has no more than 150 characters."]},
            statusCode: 400
        });
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        cy.contains('Chris Raible').click();
        cy.get('input[name="first_name"]').type('topher');
        cy.get('input[name="last_name"]').type('eeee');
        cy.get('[data-cy="name-form"]').submit();
        cy.contains('Ensure this field has no more than 150 characters.');
    });

    it('displays network error if unable to reach server on name change', () => {
        cy.intercept('PATCH', '**/api/users/1**', req => req.destroy());
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        cy.contains('Chris Raible').click();
        cy.get('input[name="first_name"]').type('topher');
        cy.get('input[name="last_name"]').type('eeee');
        cy.get('[data-cy="name-form"]').submit();
        cy.contains('Network Error');
    });

    it('successfully changes the users password', () => {
        cy.clock();
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        cy.intercept('POST', '**/api/auth/password/change/', {
            body: {detail: "New password has been saved."},
            statusCode: 200
        });
        cy.contains('Change Password').click();
        cy.get('input[name="new_password1"]').click().type('password1234');
        cy.get('input[name="new_password2"]').click().type('password1234');
        cy.get('[data-cy="change-password-form"]').submit();
        cy.contains('New password has been saved.');
        cy.tick(2000);
        cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('validates new passwords', () => {
        cy.intercept('POST', '**/api/auth/password/change/')
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        cy.contains('Change Password').click();
        cy.get('input[name="new_password1"]').click().type('passwo');
        cy.get('input[name="new_password2"]').click().type('passwo');
        cy.get('[data-cy="change-password-form"]').submit();
        cy.contains('Passwords must be at least 9 characters long.');
    });

    it('validates new passwords match', () => {
        cy.intercept('GET', '**api/accounts/1/', { fixture: 'accountFree.json' });
        cy.intercept('POST', '**api/auth/password/change**', {
            body: {"new_password2": ["The two password fields didn't match."]},
            statusCode: 400
        })
        cy.visit('/profile');
        cy.contains('Change Password').click();
        cy.get('input[name="new_password1"]').click().type('password1234');
        cy.get('input[name="new_password2"]').click().type('password12345');
        cy.get('[data-cy="change-password-form"]').submit();
        cy.contains("The two password fields didn't match.");
    });

    it('shows network error if unable to reach server on password change', () => {
        cy.intercept('POST', '**/api/auth/password/change/', req => req.destroy())
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        cy.contains('Change Password').click();
        cy.get('input[name="new_password1"]').click().type('password1234');
        cy.get('input[name="new_password2"]').click().type('password12345');
        cy.get('[data-cy="change-password-form"]').submit();
        cy.contains("Network Error");
    });

    it('successfully edits the users phone number', () => {
        cy.clock();
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        cy.intercept('PATCH', '**/api/users/1/phone/', { fixture: 'userPhoneEdited.json' });
        cy.intercept('POST', '**/api/users/1/verifyphone/', { fixture: 'userPhoneVerified.json'});
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('2154903329');
        cy.get('[data-cy="mobile-number-form"]').submit();
        // Enter a verification code
        cy.get('input[name="code"]').click().type('555555');
        cy.get('[data-cy="verify-phone-code"]').submit();
        cy.tick(2000);
        cy.get('[data-cy="modal"]').should('not.exist');
        cy.contains('+1 215-490-3329');
    });

    it('shows errors for incorrect verification codes', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        cy.intercept('PATCH', '**/api/users/1/phone/', { fixture: 'userPhoneEdited.json' });
        cy.intercept('POST', '**/api/users/1/verifyphone/', { body: {code: ["Invalid code."]}, statusCode: 400});
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('2154903329');
        cy.get('[data-cy="mobile-number-form"]').submit();
        // Enter a verification code
        cy.get('input[name="code"]').click().type('555555');
        cy.get('[data-cy="verify-phone-code"]').submit();
        cy.contains('Invalid code.');
    });

    it('shows errors for invalid verification codes', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        cy.intercept('PATCH', '**/api/users/1/phone/', { fixture: 'userPhoneEdited.json' });
        cy.intercept('POST', '**/api/users/1/verifyphone/', { body: {code: ["Invalid code."]}, statusCode: 400});
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('2154903329');
        cy.get('[data-cy="mobile-number-form"]').submit();
        // Enter a verification code
        cy.get('input[name="code"]').click().type('55555555555');
        cy.get('[data-cy="verify-phone-code"]').submit();
        cy.contains('Invalid code.');
    });

    it('shows network error for phone number verification', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        cy.intercept('PATCH', '**/api/users/1/phone/', { fixture: 'userPhoneEdited.json' });
        cy.intercept('POST', '**/api/users/1/verifyphone/', req => req.destroy());
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('2154903329');
        cy.get('[data-cy="mobile-number-form"]').submit();
        // Enter a verification code
        cy.get('input[name="code"]').click().type('555555');
        cy.get('[data-cy="verify-phone-code"]').submit();
        cy.contains('Network Error');
    });

    it('shows network error for phone number update', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        cy.intercept('PATCH', '**/api/users/1/phone/', req => req.destroy());
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('2154903329');
        cy.get('[data-cy="mobile-number-form"]').submit();
        cy.contains('Network Error');
    });

    it('validates the phone number locally', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('555555');
        cy.get('[data-cy="mobile-number-form"]').submit();
        cy.contains('Enter a valid phone number.').should('be.visible');
    });

    it('displays server validation errors for phone number', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.visit('/profile');
        // Stub API Responses
        cy.intercept('GET', '**/api/users/1/', { fixture: 'userPhoneVerified.json' });
        cy.intercept('PATCH', '**/api/users/1/phone/', {
            body: {phone: ["Enter a valid phone number."]},
            statusCode: 400
        });
        // Enter phone number and submit
        cy.get('[data-cy="change-phone"]').click();
        cy.get('input').click().type('2154903329');
        cy.get('[data-cy="mobile-number-form"]').submit();
        cy.contains('Enter a valid phone number.').should('be.visible');
    });

});