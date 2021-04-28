/// <reference types="cypress" />

describe('Esperas...', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funcionou...')
    })

    it('Deve fazer retentativas', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo')
            // .should('not.exist') dessa forma vai retornar null para os próximos
            .should('exist')
            .type('funcionou')
    })

    it('Uso do find', () => {
        // cy.get('#buttonList').click()
        // cy.get('#lista li')
        //     .find('span')
        //     .should('contain', 'Item 1')

        // // cy.get('#lista li') 
        // //     .find('span') cuidado com find nas buscas
        // //     .should('contain', 'Item 2')

        // cy.get('#lista li span')
        //     .should('contain', 'Item 2')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo', { timeout: 5000 }).should('exist')

        cy.get('#buttonListDOM').click()
        // cy.wait(5000)
        cy.get('#lista li span', {timeout: 6000})
            .should('contain', 'Item 2')

        // cy.get('#lista li span')
        //     .should('have.length', 1)

        cy.get('#lista li span')
            .should('have.length', 2)
    })

    it('Click retry', () => {
        cy.get('#buttonCount')
            .click() // comandos que alteram HtML não são retentados.
            .click()
            .should('have.value', '1')

    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').click()

        cy.get('#lista li span').then($elements => {
            console.log($elements) // vai printar uma vez
            expect($elements).to.have.length(1)
        })
        cy.get('#lista li span').should($elements => {
            console.log($elements) // vai printar varias vezes
            expect($elements).to.have.length(2)
        })

        cy.get('#buttonListDOM').should($el => {
            expect($el).to.have.length(1)
            return 2 // should vai desconsiderar esse return
        }).and('have.id', 'buttonListDOM') 
        cy.get('#buttonListDOM').then($el => {
            expect($el).to.have.length(1)
            return 2 // vai considerar o return = 2
        }).and('eq', 2) 

        cy.get('#buttonListDOM').then($el => {
            cy.get('#buttonList')
        }) // vai fazer a busca encadeada pelos dois botões normal
        cy.get('#buttonListDOM').should($el => {
            cy.get('#buttonList')
        }) // vai entrar em LOOP!!!!

    })

})
