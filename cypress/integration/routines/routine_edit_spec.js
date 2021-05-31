/// <reference types="cypress" />

describe('Routine Edit Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
            cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
            cy.viewport(size);
            cy.visit('/routines/1/edit');

            // Check the browser page title
            cy.title().should('eq', 'Edit Routine');

            // Check Primary and secondary buttons are visible
            cy.get('[data-cy="previous"]').should('be.visible');

            // Check the name field
            cy.get('input[name="name"]')
                .should('be.visible')
                .should('have.value', 'Hourly Routine');
            cy.get('textarea[name="description"]')
                .should('be.visible')
                .should('have.value', 'This is a fake routine');
            cy.get('button[type="submit"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully edits a routine', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        var i = 0
        cy.intercept('GET', '**/api/routines/1', (req) => {
            if (i === 0) {
                req.reply({
                    statusCode: 200,
                    fixture: 'routineHourly.json'
                })
            } else {
                req.reply({
                    statusCode: 200,
                    fixture: 'routineHourlyEdited.json'
                })
            }
            i++
        });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('PATCH', '**/api/routines/**', { fixture: 'routineHourlyEdited.json' }).as('updateRequest');
        cy.visit('/routines/1/edit');
        // Check the name field
        cy.get('input[name="name"]').click().type(' Edited', {force: true})
        cy.get('textarea[name="description"]');
        cy.get('form#routine-form').submit();
        cy.wait('@updateRequest').then(() => {
            cy.window()
                .its('store')
                .invoke('getState')
                .its('routines')
                .its('entities')
                .its('1')
                .its('name')
                .should('eq', 'Hourly Routine Edited');
        });
    });

    it('displays server validated errors', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('PATCH', '**/api/routines/1**', {
            body: {"name":["Ensure this field has no more than 255 characters."]},
            statusCode: 400
        });
        cy.visit('/routines/1/edit');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type(
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            {force: true, delay: 1}
        );
        cy.get('form#routine-form').submit();
        cy.contains('Ensure this field has no more than 255 characters.');
    });

    it('links back to routine page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines/1/edit')
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/routines/1');
    });

    it('shows Not found if the routine does not exist.', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/**', {
            statusCode: 404,
            body: {detail: "Not found."}
        })
        cy.visit('/routines/9999/edit');
        cy.contains('Not found')
            .should('be.visible');
    });

    it('shows network error message if unable to reach server (update)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/routines/1', { fixture: 'routineHourly.json' }).as('routineRequest');
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('PATCH', '**/api/routines/**', req => req.destroy());
        cy.visit('routines/1/edit');
        cy.get('input[name="name"]').click().type(' CHEESE', {force: true});
        cy.get('form#routine-form').submit();
        cy.contains('Network Error')
            .should('be.visible');
    });

    it('shows network error message if unable to reach server (fetch)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('**/api/routines/**', req => req.destroy());
        cy.intercept('**/api/roles/**', req => req.destroy());
        cy.visit('/routines/1/edit');
        cy.contains('Network Error')
            .should('be.visible');
    });


});