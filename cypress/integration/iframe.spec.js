/// <reference types="cypress" />

describe('Work with iframes', () => {
    it('deve preencher campo texto...', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('funciona?')
                .should('have.value', 'funciona?')
        })
    })
    
    it('deve frame diretamente...', () => {
        cy.visit('https://www.wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()  
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })      
    })
})