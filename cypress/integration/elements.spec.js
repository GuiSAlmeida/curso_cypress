/// <reference types="cypress" />


describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Text', () => {
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    });
    
    it('Links', () => {
        cy.get('a[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')        
    })

    it('Text fields', () => {
        cy.get('#formNome').type('Cypress test')
        cy.get('#formNome').should('have.value', 'Cypress test')

        cy.get('#elementosForm\\:sugestoes')
            .type('Cypress test text area')
            .should('have.value', 'Cypress test text area')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('qualquer coisa')

        cy.get('[data-cy=dataSobrenome]')
            .type('teste12345{backspace}{backspace}')
            .should('have.value', 'teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', { delay: 100 })
            .should('have.value', 'acerto')
    })

    it('Radio button', () => {
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        
        cy.get('#formSexoMasc').should('not.be.checked')

        cy.get('[name="formSexo"]').should('have.length', 2)
    })

    it('Checkbox', () => {
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]').click({ multiple: true })
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    it('Combo', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade]')
            .select('1graucomp')
            .should('have.value', '1graucomp')
    })

    it.only('Combo multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada']) // combo multiplo via array tem que ser valor value
    })
})
