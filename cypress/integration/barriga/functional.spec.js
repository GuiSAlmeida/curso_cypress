/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should test at functional level', () => {
    before(() => {
        cy.login('guisalmeida.dev@gmail.com', 'guidev')
        cy.resetApp()
    })

    beforeEach(() => {
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })
    
    it('Login', () => {
        cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Should add account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Update an account', () => {
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.inserirConta('Conta alterada')
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with the same name', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })
    
    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descrição teste')
        cy.get(loc.MOVIMENTACAO.VALOR).type('100')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Nubank')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Descrição teste', '100,00')).should('exist')
    })
    
    it.only('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
    })
    
    it('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})
