/// <reference types="cypress" />

describe('Work with dinamic test', () => {
    beforeEach(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach((food) => {
        it(`Cadastro com comida ${food}..`, () => {
            cy.get('#formNome').type('Gui')
            cy.get('#formSobrenome').type('Almeida')
            cy.get('[name=formSexo][value=M]').click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Superior')
            cy.get('#formEsportes').select('Corrida')

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
        })
    })

    it('Select almost all with each...', () => {
        cy.get('#formNome').type('Gui')
        cy.get('#formSobrenome').type('Almeida')
        cy.get('[name=formSexo][value=M]').click()

        cy.get('[name=formComidaFavorita]').each($el => {
            // $el.click()
            if($el.val() !== 'vegetariano') {
                cy.wrap($el).click()
            }
        })

        cy.get('#formEscolaridade').select('Superior')
        cy.get('#formEsportes').select('Corrida')

        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')

        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
})