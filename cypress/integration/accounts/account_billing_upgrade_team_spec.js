/// <reference types="cypress" />

describe('Upgrade to Team', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.viewport(size);
            cy.intercept('GET', '**/prices/**', { fixture: 'fetchPrice.json'});
            cy.intercept('POST', '**/upcoming_invoice**', { fixture: 'fetchUpcomingInvoice.json' });
            cy.intercept('GET', '**/accounts/**', {fixture: 'accountFree.json'});
            cy.visit('/account/billing/upgradeTeam/price_1IdVRJJaJXMgpjCHIyNe5LQU');

            // Check page title
            cy.title().should('eq', 'Account')

            cy.contains('Upgrade to Team').should('be.visible');
            cy.contains('How many people are on your team?').should('be.visible');
            cy.get('[data-cy="add-user"]').should('be.visible');
            cy.get('[data-cy="remove-user"]').should('be.visible');
            cy.contains('Continue').should('be.visible');
        });
    });

    it('successfully upgrades to team', () => {
        cy.intercept('GET', '**/prices/**', { fixture: 'fetchPrice.json'});
        cy.intercept('POST', '**/upcoming_invoice**', { fixture: 'fetchUpcomingInvoice.json' });
        cy.intercept('GET', '**/accounts/**', {fixture: 'accountFree.json'});
        cy.intercept('POST', '**/api/accounts/1/create_subscription', {
            fixture: 'accountTeam.json'
        });
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.visit('/account/billing/upgradeTeam/price_1IdVRJJaJXMgpjCHIyNe5LQU');
        cy.contains('Continue').click();
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('4242424242424242042444455555');
        });
        cy.get('[data-cy="upgrade-form"]').submit();
        cy.get('[data-cy="success-message"]').contains('Account successfully upgraded');

    });

    it('displays API errors for failed credit card', () => {
        cy.intercept('GET', '**/prices/**', { fixture: 'fetchPrice.json'});
        cy.intercept('POST', '**/upcoming_invoice**', { fixture: 'fetchUpcomingInvoice.json' });
        cy.intercept('GET', '**/accounts/**', {fixture: 'accountFree.json'});
        cy.intercept('POST', '**/api/accounts/1/create_subscription', {
            statusCode: 402,
            body: {'credit-card': ["Your card was declined."]}
        });
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.visit('/account/billing/upgradeTeam/price_1IdVRJJaJXMgpjCHIyNe5LQU');
        cy.contains('Continue').click();
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('4000000000000002042444455555');
        });
        cy.get('[data-cy="upgrade-form"]').submit();
        cy.contains('Your card was declined.')
    });

    it('requires the credit card number', () => {
        cy.intercept('GET', '**/prices/**', { fixture: 'fetchPrice.json'});
        cy.intercept('POST', '**/upcoming_invoice**', { fixture: 'fetchUpcomingInvoice.json' });
        cy.intercept('GET', '**/accounts/**', {fixture: 'accountFree.json'});
        cy.intercept('POST', '**/api/accounts/1/create_subscription', {
            fixture: 'accountTeam.json'
        });
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.visit('/account/billing/upgradeTeam/price_1IdVRJJaJXMgpjCHIyNe5LQU');
        cy.contains('Continue').click();
        cy.wait('@stripe');
        cy.get('[data-cy="upgrade-form"]').submit();
        cy.contains('Your card number is incomplete.');
    });

});