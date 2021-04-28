/// <reference types="cypress" />

describe('Cypress basics', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')

        cy.title().then(title => {
            console.log(title)
        })
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})