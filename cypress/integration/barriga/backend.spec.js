/// <reference types="cypress" />

describe('Should test at backend level', () => {
    // let token

    before(() => {
        cy.getToken('guisalmeida.dev@gmail.com', 'guidev')
            // .then(responseToken => {
            //     token = responseToken
            // })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Should get token with login', () => {
        cy.getToken('guisalmeida.dev@gmail.com', 'guidev')
    })

    it('Should add account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Update an account', () => {
        cy.getContaByName('Conta para alterar')
            .then(contaId => {
                cy.request({
                    url: `/contas/${contaId}`,
                    method: 'PUT',
                    // headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'Conta alterada pelo Cypress'
                    }
                }).as('response')
            })

        cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Should not create an account with the same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            // headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    url: '/transacoes',
                    method: 'POST',
                    // headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
                        data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                        descricao: "Aluguel pago",
                        envolvido: "Gui",
                        status: true,
                        tipo: "REC",
                        valor: "800"
                    },
                })
            }).as('response')

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Should get balance', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            // headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            const saldoConta = res.body.find(c => c.conta === 'Conta para saldo').saldo
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            url: '/transacoes',
            method: 'GET',
            // headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                // headers: { Authorization: `JWT ${token}` },
                body: {
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id,
                    status: true
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            method: 'GET',
            url: '/saldo',
            // headers: { Authorization: `JWT ${token}` },
        }).then(res => {
            const saldoConta = res.body.find(c => c.conta === 'Conta para saldo').saldo
            expect(saldoConta).to.be.equal('4034.00')
        })

    })

    it('Should remove a transaction', () => {
        cy.getIdByDescription('Movimentacao para exclusao')
            .then(contaId => {
                cy.request({
                    url: `/transacoes/${contaId}`,
                    method: 'DELETE',
                    // headers: { Authorization: `JWT ${token}` },
                }).its('status').should('be.equal', 204)
            })
    })
})
