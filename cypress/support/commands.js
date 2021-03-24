import { login } from '../../src/features/auth/authSlice';

const dispatch = (action) => cy.window().its('store').then((store) => {
    store.dispatch(action)
});

// -- This is a parent command --
Cypress.Commands.add("login", () => {
    cy.clearLocalStorage();
    cy.intercept('**/api/auth/**').as('loginRequest');
    cy.visit('/');
    dispatch(login({
        email: 'chris@routineops.com',
        password: 'password'
    }));
    cy.wait('@loginRequest');
    cy.window()
        .its('store')
        .invoke('getState')
        .should((state) => {
            expect(state.auth.token).to.have.lengthOf(40);
            expect(state.auth.userId).to.be.greaterThan(0);
    });
});

Cypress.Commands.add("loginStubbed", (accountFixture) => {
    const account = accountFixture || 'accountFree.json'
    cy.clearLocalStorage();
    cy.intercept('GET', '**/api/accounts/1**', { fixture: account });
    cy.intercept('POST', '**/api/auth/login/', { fixture: 'loginResponse.json' }).as('loginRequest');
    cy.visit('/');
    dispatch(login({
        email: 'chris@routineops.com',
        password: 'password'
    }));
    cy.wait('@loginRequest');
    cy.window()
        .its('store')
        .invoke('getState')
        .should((state) => {
            expect(state.auth.token).to.eq('fake_auth_token');
            expect(state.auth.userId).to.eq(1);
    });
})

Cypress.Commands.add("logout", () => {
    cy.clearLocalStorage();
});


Cypress.Commands.add(
    'iframeLoaded',
    {prevSubject: 'element'},
    ($iframe) => {
        const contentWindow = $iframe.prop('contentWindow');
        return new Promise(resolve => {
            if (
                contentWindow &&
                contentWindow.document.readyState === 'complete'
            ) {
                resolve(contentWindow)
            } else {
                $iframe.on('load', () => {
                    resolve(contentWindow)
                })
            }
        })
    });


Cypress.Commands.add(
    'getInDocument',
    {prevSubject: 'document'},
    (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add(
    'getWithinIframe',
    (targetElement) => cy.get('.__PrivateStripeElement > iframe').iframeLoaded().its('document').getInDocument(targetElement)
);