/// <reference types="cypress" />

describe('Locators...', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Selector playground atributo personalizado...', () => {
        cy.get('[data-wc=achou]').check()
    })

    it.only('Usando jquery selector...', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*="Francisco"]').click()
        cy.get('#tabelaUsuarios td:contains("Doutorado") ~ td:eq(3) > input')
        cy.get('#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input').type('Encontrou')
    })

    it.only('Usando xpath...', () => {
        cy.xpath('//input[contains(@onclick, "Francisco")]')
            .click()

        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(., "Francisco")]/..//input[@type="text"]')
            .type('Achou')
            
        cy.xpath('(//table[@id="tabelaUsuarios"]//td[contains(., "Doutorado")])[2]/..//input[@type="checkbox"]').check()

        cy.xpath('//td[contains(., "Usuario A")]/following-sibling::td[contains(.,"Mestrado")]/..//input[@type="text"]').type('Funcionou')
    })
})