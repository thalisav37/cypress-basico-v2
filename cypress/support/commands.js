Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Thalis')
    cy.get('#lastName').type('Apolonio')
    cy.get('#email').type('thalisav37@gmail.com')
    cy.get('#open-text-area').type('Test')
    cy.contains('button', 'Enviar').click()
})