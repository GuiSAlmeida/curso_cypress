import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTA).click()
})

Cypress.Commands.add('inserirConta', (conta) => {
    cy.get(loc.CONTAS.NOME).clear().type(conta)
    cy.get(loc.CONTAS.BTN_SALVAR).click()
})