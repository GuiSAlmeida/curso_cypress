/// <reference types="cypress" />

describe('Should test at backend level', () => {
    let token

    before(() => {
        cy.getToken('guisalmeida.dev@gmail.com', 'guidev')
            .then(responseToken => {
                token = responseToken
            })
    })

    beforeEach(() => {
        cy.resetRest(token)
    })

    it('Should get token with login', () => {
        cy.getToken('guisalmeida.dev@gmail.com', 'guidev')
    })

    it('Should add account', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
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
        cy.request({
            url: '/contas',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
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
            headers: { Authorization: `JWT ${token}` },
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
    })

    it('Should get balance', () => {
    })

    it('Should remove a transaction', () => {
    })
})
