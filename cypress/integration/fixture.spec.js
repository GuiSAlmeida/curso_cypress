/// <reference types="cypress" />

describe('Fixtures test ...', () => {
    it('Get data form fixture file', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.fixture('userData').as('user').then(function () {
            cy.get('#formNome').type(this.user.nome)
            cy.get('#formSobrenome').type(this.user.sobrenome)
            cy.get(`[name=formSexo][value=${this.user.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.user.comida}]`).click()
            cy.get('#formEscolaridade').select(this.user.escolaridade)
            cy.get('#formEsportes').select(this.user.esportes)
        })

        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
    })
})
