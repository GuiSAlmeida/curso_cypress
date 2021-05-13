/// <reference types="cypress" />

describe('Work with Alerts', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })


    beforeEach(() => {
        cy.reload()
    })
    
    it('Alert...', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com mock...', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm...', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })

    it('Deny...', () => {
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })

    it.only('Prompt...', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns(22)
        })
        cy.on('window:confirm', msg => {
            expect(msg).to.be.equal('Era 22?')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })

        cy.get('#prompt').click()
    })

    it.only('Desafio cadastrar...', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })
        
        cy.get('#formNome').type('Guilherme')

        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        
        cy.get('[data-cy=dataSobrenome]').type('Almeida')
        
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
        
        cy.get('#formSexoMasc').check()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
    })
})