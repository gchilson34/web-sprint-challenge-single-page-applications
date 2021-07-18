describe('Name Form', function() {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza")
    })
    it('Gets the name input and types in a name', function() {
        cy.get('[name="name"]')
        .type('Gabe')
        .should('have.value', 'Gabe')
    })
});

describe('Special Text', function() {
    it('Gets the special text input and types in something', function() {
        cy.get('[name="specialText"]')
        .type('Drop it like it is hot')
        .should('have.value', 'Drop it like it is hot')
    })
});

describe('Toppings', function() {
    it('clicks several toppings button and confirms they works', function() {
        cy.get('[name="pepperoni"]').click()
        cy.get('[name="peppers"]').click()
        cy.get('[name="olive"]').click()
    })
});

describe('Order Button', function() {
    it('clicks the add to order button and confirms it works', function() {
        cy.get('[name="order-button"]').click()
    })
});