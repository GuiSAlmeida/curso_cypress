/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at frontend level', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('guisalmeida.dev@gmail.com', 'senha errada')
        cy.get(loc.MENU.HOME).click()

    })

    it('Should test responsivity', () => {
        cy.viewport('ipad-2')
        cy.get('[data-test=menu-home]').should('exist').and('be.visible')

        cy.viewport('iphone-5')
        cy.get('[data-test=menu-home]').should('exist').and('be.not.visible')
    })

    it('Should add account', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {
                id: 3,
                nome: 'Conta teste',
                visivel: true,
                usuario_id: 3
            },
        }).as('addConta')


        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: 'Carteira',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 2
                },
                {
                    id: 3,
                    nome: 'Conta teste',
                    visivel: true,
                    usuario_id: 3
                }
            ]
        }).as('contasUpdated')

        cy.inserirConta('Conta teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Update an account', () => {
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: [
                {
                    id: 1,
                    nome: 'Conta alterada',
                    visivel: true,
                    usuario_id: 1
                }
            ]
        }).as('contas')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                {
                    id: 1,
                    nome: 'Conta alterada',
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: 'Banco',
                    visivel: true,
                    usuario_id: 2
                }
            ]
        }).as('contasUpdated')

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.inserirConta('Conta alterada')
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with the same name', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: { "error": "Já existe uma conta com esse nome!" },
            status: 400,
        }).as('addContaMesmoNome')

        cy.acessarMenuConta()
        cy.inserirConta('Carteira')
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                id: 608299,
                descricao: 'Aluguel pago',
                envolvido: 'Gui',
                observacao: null,
                tipo: 'REC',
                data_transacao: '2021-06-25T03:00:00.000Z',
                data_pagamento: '2021-06-25T03:00:00.000Z',
                valor: '800.00',
                status: true,
                conta_id: 656379,
                usuario_id: 21505,
                transferencia_id: null,
                parcelamento_id: null
            }
        })
        
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: 'fixture:movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descrição teste')
        cy.get(loc.MOVIMENTACAO.VALOR).type('100')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Nubank')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Carteira')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Aluguel pago', '800,00')).should('exist')
    })

    it('Should get balance', () => {
        cy.route({
            method: 'GET',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 608644,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-06-25T03:00:00.000Z",
                "data_pagamento": "2021-06-25T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 657030,
                "usuario_id": 21505,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.route({
            method: 'PUT',
            url: '/transacoes/**',
            response: {
                "conta": "Conta para saldo",
                "id": 608644,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-06-25T03:00:00.000Z",
                "data_pagamento": "2021-06-25T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 657030,
                "usuario_id": 21505,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.route({
            method: 'GET',
            url: '/saldo',
            response: [
                {
                    conta_id: 999,
                    conta: 'Carteira',
                    saldo: '3600.00'
                },
                {
                    conta_id: 111,
                    conta: 'Banco',
                    saldo: '1000.00'
                }
            ]
        }).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '3.600,00')
    })

    it('Should remove a transaction', () => {
        cy.route({
            method: 'DELETE',
            url: '/transacoes/**',
            response: {},
            status: 204
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                { "conta": "Conta com movimentacao", "id": 608643, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 657029, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 608644, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 608645, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 608646, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para extrato", "id": 608647, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 657031, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null }]
            }).as('movimentacoesUpdate')

        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Should validate data send to add an account with ONREQUEST', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 },
            onRequest: req => {
                expect(req.request.body.nome).to.be.not.empty
                expect(req.request.headers).to.have.property('Authorization')
            }
        }).as('addConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 },
                { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 }
            ]
        }).as('contasUpdated')

        cy.inserirConta('Conta teste')

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should validate data send to add an account with WAIT', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 },
        }).as('addConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 },
                { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 }
            ]
        }).as('contasUpdated')

        cy.inserirConta('Conta teste')

        cy.wait('@addConta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should validate data send to add an account with STUB', () => {
        const reqStub = cy.stub()

        cy.route({
            method: 'POST',
            url: '/contas',
            response: {id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 },
            onRequest: reqStub
        }).as('addConta')

        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response: [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 },
                { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 }
            ]
        }).as('contasUpdated')

        cy.inserirConta('Conta teste')

        // validar request com stub
        cy.wait('@addConta').then(() => {
            expect(reqStub.args[0][0].request.body.nome).to.be.not.empty
            expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
        })

        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })

    it('Should test colors', () => {
        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                { "conta": "Conta para movimentacoes", "id": 608642, "descricao": "Receita paga", "envolvido": "AAA", "observacao": null, "tipo": "REC", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 657028, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta com movimentacao", "id": 608643, "descricao": "Receita pendente", "envolvido": "BBB", "observacao": null, "tipo": "REC", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1500.00", "status": false, "conta_id": 657029, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 608644, "descricao": "Despesa paga", "envolvido": "CCC", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "3500.00", "status": true, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
                { "conta": "Conta para saldo", "id": 608645, "descricao": "Despesa pendente", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1000.00", "status": false, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null }
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })
})
