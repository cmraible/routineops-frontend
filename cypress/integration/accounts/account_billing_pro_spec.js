/// <reference types="cypress" />

describe('Account Billing Pro Page', () => {

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountPro.json'});
            cy.login();
            cy.viewport(size);
            cy.visit('/account/billing')
            // Check page title
            cy.title().should('eq', 'Account')

            cy.contains('Account').should('be.visible');
            cy.contains('Pro').should('be.visible');
            cy.contains('Upgrade to Team').should('be.visible');
            cy.contains('Credit Card').should('be.visible');
            cy.contains('Cancel').should('be.visible');
            cy.contains('4242').should('be.visible');
            cy.contains('Cancel Subscription').should('be.visible');
        });
    });

    it('shows the VISA icon if visa', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountProVisa.json'});
        cy.login();
        cy.visit('/account/billing');
        cy.get('[data-cy="visa"]').should('be.visible');
    });

    it('shows the MasterCard icon if mastercard', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountProMastercard.json'});
        cy.login();
        cy.visit('/account/billing');
        cy.get('[data-cy="mastercard"]').should('be.visible');
    });

    it('shows the Amex icon if Amex', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountProAmex.json'});
        cy.login();
        cy.visit('/account/billing');
        cy.get('[data-cy="amex"]').should('be.visible');
    });

    it('shows the the CC brand if no icon', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountProDiners.json'});
        cy.login();
        cy.visit('/account/billing');
        cy.contains('Diners').should('be.visible');
    });

    it('successfully updates the account credit card', () => {
        cy.clock()
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountPro.json'});
        cy.intercept('PATCH', '**/api/accounts/1/update_default_payment_method', { fixture: 'accountCCUpdated.json'});
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('4242').click();
        cy.contains('Update Credit Card').should('be.visible');
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('3714496353984310424444555555');
        });
        cy.get('[data-cy="credit-card-form"]').submit();
        cy.contains('Credit card successfully updated.');
        cy.tick(5000);
        cy.contains('4444').should('be.visible');
        cy.clock().invoke('restore');
    });

    it('shows errors for a declined credit card', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountPro.json'});
        cy.intercept('PATCH', '**/api/accounts/1/update_default_payment_method', { fixture: 'accountCCUpdated.json'});
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('4242').click();
        cy.contains('Update Credit Card').should('be.visible');
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('4000000000000002042444455555');
        });
        cy.get('[data-cy="credit-card-form"]').submit();
        cy.contains('Your card was declined.');
    });

    it('shows errors if setup intent fails to load', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountPro.json'});
        cy.intercept('GET', '**/api/accounts/1/create_setup_intent/', req => req.destroy())
        cy.intercept('PATCH', '**/api/accounts/1/update_default_payment_method', { fixture: 'accountCCUpdated.json'});
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('4242').click();
        cy.contains('Update Credit Card').should('be.visible');
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('5555555555554444042444455555');
        });
        cy.get('[data-cy="credit-card-form"]').submit();
        cy.contains('Unable to reach payment processor.');
    });

    it('shows errors if setup intent fails to confirm', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountPro.json'});
        cy.intercept('PATCH', '**/api/accounts/1/update_default_payment_method', { fixture: 'accountCCUpdated.json'});
        cy.intercept('POST', '**/v1/setup_intents/**/confirm', req => req.destroy());
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('4242').click();
        cy.contains('Update Credit Card').should('be.visible');
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('5555555555554444042444455555');
        });
        cy.get('[data-cy="credit-card-form"]').submit();
        cy.contains('We are experiencing issues');
    });

    it('shows errors if unable to reach server on CC update', () => {
        cy.intercept('GET', '**/api/accounts/1**', { fixture: 'accountPro.json'});
        cy.intercept('PATCH', '**/api/accounts/1/update_default_payment_method', req => req.destroy());
        cy.intercept('GET', '**elements.event.load**').as('stripe');
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('4242').click();
        cy.contains('Update Credit Card').should('be.visible');
        cy.wait('@stripe');
        cy.get('.__PrivateStripeElement > iframe')
            .then(element => {
            const body = element.contents().find('body');
            cy.wrap(body).find('[name="cardnumber"]').eq(0).click().type('5555555555554444042444455555');
        });
        cy.get('[data-cy="credit-card-form"]').submit();
        cy.contains('Unable to update payment method.');
    });

    it('successfully cancels the subscription', () => {
        var i = 0;
        cy.intercept('GET', '**/api/accounts/1**', req => {
            if (i < 2) {
                req.reply({fixture: 'accountPro.json'})
            } else {
                req.reply({fixture: 'accountFree.json'})
            }
            i++
        });
        cy.intercept('DELETE', '**/api/accounts/1/cancel_subscription', { fixture: 'accountFree.json' });
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('Cancel Subscription').click();
        cy.contains('Cancel Subscription').should('be.visible');
        cy.get('input[name="cancel"]').type('CANCEL');
        cy.get('[data-cy="cancel-form"]').submit();
        cy.contains('Upgrade to Pro');
    });

    it('requires CANCEL to the subscription', () => {
        var i = 0;
        cy.intercept('GET', '**/api/accounts/1**', req => {
            if (i < 2) {
                req.reply({fixture: 'accountPro.json'})
            } else {
                req.reply({fixture: 'accountFree.json'})
            }
            i++
        });
        cy.intercept('DELETE', '**/api/accounts/1/cancel_subscription', { fixture: 'accountFree.json' });
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('Cancel Subscription').click();
        cy.contains('Cancel Subscription').should('be.visible');
        cy.get('input[name="cancel"]').type('cancel');
        cy.get('[data-cy="cancel-form"]').submit();
        cy.contains('Please type the word CANCEL in all capital letters');
    });

    it('shows errors if unable to cancel subscription', () => {
        var i = 0;
        cy.intercept('GET', '**/api/accounts/1**', req => {
            if (i < 2) {
                req.reply({fixture: 'accountPro.json'})
            } else {
                req.reply({fixture: 'accountFree.json'})
            }
            i++
        });
        cy.intercept('DELETE', '**/api/accounts/1/cancel_subscription', req => req.destroy());
        cy.login();
        cy.visit('/account/billing')
        // Check page title
        cy.contains('Cancel Subscription').click();
        cy.contains('Cancel Subscription').should('be.visible');
        cy.get('input[name="cancel"]').type('CANCEL');
        cy.get('[data-cy="cancel-form"]').submit();
        cy.contains('Unable to cancel subscription at this time.')
    });

});