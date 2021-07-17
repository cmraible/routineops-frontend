/// <reference types="cypress" />

describe('Account Settings Page', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.login();
            cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });

            cy.visit('/account/settings');
            cy.viewport(size);
            // Check page title
            cy.title().should('eq', 'Account');

            cy.get('[data-cy="site-navigation"]').should('be.visible');

            cy.get('[data-cy="account-tabs"]').should('be.visible');

            cy.contains('Calendar Settings').should('be.visible');
            cy.contains('Weekstart').should('be.visible');
            cy.contains('Working Days').should('be.visible');
        });
    });

    it('successfully updates the weekstart', () => {
        cy.intercept('PATCH', '**/api/accounts/1**', {
            fixture: 'accountWeekstartEdited.json'
        });
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.login();
        cy.visit('/account/settings');
        cy.contains('Monday').click();
        cy.contains('Weekstart').should('be.visible');
        cy.get('input[name="wkst"]').click();
        cy.contains('Tuesday').click();
        cy.get('[data-cy="weekstart-form"]').submit();
        cy.contains('Calendar Settings').should('be.visible');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                expect(state.accounts.entities[1].wkst).to.eq(1)
        });
    });

    it('shows api errors for updating weekstart', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.intercept('PATCH', '**/api/accounts/1**', {
            statusCode: 400,
            body: {'wkst': ["Error updating weekstart."]}
        });
        cy.login();
        cy.visit('/account/settings');
        cy.contains('Monday').click();
        cy.contains('Weekstart').should('be.visible');
        cy.get('input[name="wkst"]').click();
        cy.contains('Tuesday').click();
        cy.get('[data-cy="weekstart-form"]').submit();
        cy.contains('Error updating weekstart.');
    });

    it('shows network errors for updating weekstart', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.intercept('PATCH', '**/api/accounts/1**', req => req.destroy());
        cy.login();
        cy.visit('/account/settings');
        cy.contains('Monday').click();
        cy.contains('Weekstart').should('be.visible');
        cy.get('input[name="wkst"]').click();
        cy.contains('Tuesday').click();
        cy.get('[data-cy="weekstart-form"]').submit();
        cy.contains('Network Error');
    });

    it('successfully updates the working days', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.intercept('PATCH', '**/api/accounts/1**', {
            fixture: 'accountWorkingDaysEdited.json'
        });
        cy.login();
        cy.visit('/account/settings');
        cy.contains('M,T,W,T,F,S,S').click();
        cy.contains('Working Days').should('be.visible');
        cy.contains('Saturday').click();
        cy.contains('Sunday').click();
        cy.get('[data-cy="working-days-form"]').submit();
        cy.contains('Calendar Settings').should('be.visible');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                expect(state.accounts.entities[1].working_days).to.deep.eq([0,1,2,3,4])
        });
    });

    it('shows API errors from updating working days', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.intercept('PATCH', '**/api/accounts/1**', {
            statusCode: 400,
            body: {'working_days': ["Error updating working days."]}
        });
        cy.login();
        cy.visit('/account/settings');
        cy.contains('M,T,W,T,F,S,S').click();
        cy.contains('Working Days').should('be.visible');
        cy.contains('Saturday').click();
        cy.contains('Sunday').click();
        cy.get('[data-cy="working-days-form"]').submit();
        cy.contains('Error updating working days.');

    });

    it('shows network errors for updating working days', () => {
        cy.intercept('GET', '**/accounts/**', { fixture: 'accountFree.json' });
        cy.intercept('PATCH', '**/api/accounts/1**', req => req.destroy());
        cy.login();
        cy.visit('/account/settings');
        cy.contains('M,T,W,T,F,S,S').click();
        cy.contains('Working Days').should('be.visible');
        cy.contains('Saturday').click();
        cy.contains('Sunday').click();
        cy.get('[data-cy="working-days-form"]').submit();
        cy.contains('Network Error');

    })

});