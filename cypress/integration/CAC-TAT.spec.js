/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
})
    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test,'
        
        cy.clock()
        
        cy.get('#firstName').type('Thalis')
        cy.get('#lastName').type('Apolonio')
        cy.get('#email').type('thalisav37@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        
        const longText = 'Test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test,'
        cy.get('#firstName').type('Thalis')
        cy.get('#lastName').type('Apolonio')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')

    })
    it('Numbers only', () => {
        cy.get('#phone').type('abcdefghijk').should('have.value', '')
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        
        const longText = 'Test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test,'
        cy.get('#firstName').type('Thalis')
        cy.get('#lastName').type('Apolonio')
        cy.get('#email').type('thalisav37@gmail.com')
        cy.get('input[type="checkbox"]').last().check().should('be.checked')
        cy.get('#open-text-area').type(longText, { delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')        
    })
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longText = 'Test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test, test,'
        cy.get('#firstName').type('Thalis').should('have.value', 'Thalis').clear().should('have.value', '')
        cy.get('#lastName').type('Apolonio').should('have.value', 'Apolonio').clear().should('have.value', '')
        cy.get('#email').type('thalisav37@gmail.com').should('have.value', 'thalisav37@gmail.com').clear().should('have.value', '')
        cy.get('#phone-checkbox').click()
        cy.get('#phone').type('9999999').should('have.value', '9999999').clear().should('have.value', '')
    })
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()
        
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })
    it('Envia o formuário com sucesso usando um comando customizado', function() { 
        cy.clock()
        
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })
    it('Seleciona um produto (YouTube) por seu texto', () => { 
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('Seleciona um produto (Mentoria) por seu valor (value)', () => { 
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('Seleciona um produto (Blog) por seu índice', () => { 
        cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('Marca o tipo de atendimento "Feedback"', () => { 
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it('Marca cada tipo de atendimento', function() { 
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    it('Marca ambos checkboxes, depois desmarca o último', function() { 
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })
    it('Seleciona um arquivo da pasta fixtures', function() { 
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona um arquivo simulando um drag-and-drop', function() { 
        cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() { 
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value', longText)
      })
      it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const { status, statusText, body } = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
      })
      it.only('Encontra o gato escondido', function() {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
          .should('be.visible')
        cy.get('#subtitle')
            .invoke('text', 'Eu <3 gatos')
      })
})