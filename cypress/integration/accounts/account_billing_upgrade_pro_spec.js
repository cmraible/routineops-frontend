/// <reference types="cypress" />

describe('Upgrade to Pro', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.viewport(size);
            cy.visit('/account/billing/upgradePro');

            // Check page title
            cy.title().should('eq', 'Account')

            cy.contains('Upgrade to Pro').should('be.visible');
        });
    });

    it('successfully upgrades to pro', () => {
        cy.intercept('POST', '**/api/accounts/1/create_subscription', {
            fixture: 'accountPro.json'
        });
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.visit('/account/billing/upgradePro');
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
        cy.intercept('POST', '**/api/accounts/1/create_subscription', {
            statusCode: 402,
            body: {'credit-card': ["Your card was declined."]}
        });
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.visit('/account/billing/upgradePro');
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
        cy.intercept('POST', '**/api/accounts/1/create_subscription', {
            fixture: 'accountPro.json'
        });
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.visit('/account/billing/upgradePro');
        cy.wait('@stripe');
        cy.get('[data-cy="upgrade-form"]').submit();
        cy.contains('Your card number is incomplete.');
    });


});