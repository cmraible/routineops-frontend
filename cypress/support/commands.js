import { login } from '../../src/features/auth/authSlice';

const dispatch = (action) => cy.window().its('store').invoke('dispatch', action);

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

Cypress.Commands.add("logout", () => {
    cy.clearLocalStorage();
});