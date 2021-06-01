/// <reference types="cypress" />

describe('Routine Add Page', () => {

    beforeEach(() => {
        cy.login();
    });

    const sizes = Cypress.config('sizes')
    sizes.forEach((size) => {
        it(`renders properly on ${size} screen`, () => {
            cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
            cy.viewport(size)
            cy.visit('/routines/add');

            // Check the browser page title
            cy.title().should('eq', 'Add Routine');

            // Check the name field
            cy.get('input[name="name"]').should('be.visible');
            cy.get('textarea[name="description"]').should('be.visible');
            cy.get('input[name="role"]').should('be.visible');
            cy.get('input[name="label"]').should('be.visible');
            cy.get('button[type="submit"]').should('be.visible');

            // Check the tab bar displays everything it should
            cy.get('[data-cy="site-navigation"]').should('be.visible');

        });
    });

    it('successfully adds a routine (Hourly)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' }).as('routineRequest')
        cy.intercept('POST', '**/api/routines/**', {
            statusCode: 201,
            fixture: 'routineHourly.json'
        }).as('routineRequest')
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Hourly Routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Hourly').click();
        cy.get('form#routine-form').submit();
        cy.wait('@routineRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/routines');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const routine = state.routines.entities[1];
                expect(routine.name).to.eq('Hourly Routine');
                expect(routine.description).to.eq('This is a fake routine');
            });
    });

    it('successfully adds a routine (Daily)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' }).as('routineRequest')
        cy.intercept('POST', '**/api/routines/**', {
            statusCode: 201,
            fixture: 'routineDaily.json'
        });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Daily routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Daily').click();
        cy.get('form#routine-form').submit();
        cy.wait('@routineRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/routines');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const routine = state.routines.entities[2];
                expect(routine.name).to.eq('Daily Routine');
                expect(routine.description).to.eq('This is a fake routine');
            });
    });

    it('successfully adds a routine (Weekly)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' }).as('routineRequest')
        cy.intercept('POST', '**/api/routines/**', {
            statusCode: 201,
            fixture: 'routineWeekly.json'
        });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Weekly Routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Weekly').click();
        cy.get('form#routine-form').submit();
        cy.wait('@routineRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/routines');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const routine = state.routines.entities[3];
                expect(routine.name).to.eq('Weekly Routine');
                expect(routine.description).to.eq('This is a fake routine');
            });
    });

    it('successfully adds a routine (Bi-Weekly)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' }).as('routineRequest')
        cy.intercept('POST', '**/api/routines/**', {
            statusCode: 201,
            fixture: 'routineBiweekly.json'
        });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Biweekly routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Bi-Weekly').click();
        cy.get('form#routine-form').submit();
        cy.wait('@routineRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/routines');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const routine = state.routines.entities[4];
                expect(routine.name).to.eq('Biweekly Routine');
                expect(routine.description).to.eq('This is a fake routine');
            });
    });

    it('successfully adds a routine (Monthly)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' }).as('routineRequest')
        cy.intercept('POST', '**/api/routines/**', {
            statusCode: 201,
            fixture: 'routineMonthly.json'
        });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Monthly Routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Monthly').click();
        cy.get('form#routine-form').submit();
        cy.wait('@routineRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/routines');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const routine = state.routines.entities[5];
                expect(routine.name).to.eq('Monthly Routine');
                expect(routine.description).to.eq('This is a fake routine');
            });
    });

    it('successfully adds a routine (Yearly)', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines', { fixture: 'routines.json' }).as('routineRequest')
        cy.intercept('POST', '**/api/routines/**', {
            statusCode: 201,
            fixture: 'routineMonthly.json'
        });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Yearly routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Yearly').click();
        cy.get('form#routine-form').submit();
        cy.wait('@routineRequest');
        // Check the url redirect and the state
        cy.location('pathname').should('eq', '/routines');
        cy.window()
            .its('store')
            .invoke('getState')
            .should((state) => {
                const routine = state.routines.entities[6];
                expect(routine.name).to.eq('Yearly Routine');
                expect(routine.description).to.eq('This is a fake routine');
            });
    });

    it('requires the name field', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Hourly').click();
        cy.get('form#routine-form').submit();
        cy.contains('required')
    });

    it('requires the role field', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Fake Routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="label"]').click();
        cy.contains('Hourly').click();
        cy.get('form#routine-form').submit();

        cy.contains('required')
    });

    it('requires the frequency/label field', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Fake Routine', {force:true});
        cy.get('textarea[name="description"]').click().type('This is a fake routine', {force:true});
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('form#routine-form').submit();
        cy.contains('required')
    });

    it('links back to the routines page', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('GET', '**/api/routines**', {fixture: 'routines.json'})
        cy.visit('/routines/add');
        cy.get('[data-cy="previous"]').click();
        cy.location('pathname').should('eq', '/routines');
    });

    it('displays server validated errors', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('POST', '**/api/routines/**', {
            body: {name: ["Ensure this field has no more than 255 characters."]},
            statusCode: 400
        });
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type(
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            {force: true, delay: 1}
        );
        cy.get('textarea[name="description"]').type('This is a fake routine');
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Weekly').click();
        cy.get('form#routine-form').submit();
        cy.contains('Ensure this field has no more than 255 characters.');
    });

    it('shows error message if unable to add routine', () => {
        cy.intercept('GET', '**/api/accounts/**', {fixture: 'accountTeam.json' });
        cy.intercept('GET', '**/api/roles', { fixture: 'roles.json' });
        cy.intercept('**/api/routines/**', req => req.destroy());
        cy.visit('/routines/add');
        // Fill out and submit form
        cy.get('input[name="name"]').click().type('Fake Routine', {force: true});
        cy.get('textarea[name="description"]').type('This is a fake routine');
        cy.get('input[name="role"]').click();
        cy.contains('CEO').should('be.visible').click();
        cy.get('input[name="label"]').click();
        cy.contains('Weekly').click();
        cy.get('form#routine-form').submit();
        cy.contains('Network Error')
            .should('be.visible');
    });

});