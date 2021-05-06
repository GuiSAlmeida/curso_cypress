/// <reference types="cypress" />

describe('Helpers..', () => {
    it('Wrap', () => {
        const obj = {name: 'User', age: 20}
        expect(obj).to.have.property('name')

        // obj.should('have.property', 'name') não está encapsulado, should não vai funcionar
        cy.wrap(obj).should('have.property', 'name')


        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').then($el => {
            // $el.val('funciona com jquery') não é melhor opção, não mostra no log
            cy.wrap($el).type('funciona com cypress')
        })


        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        // promise.then(ret => console.log(ret))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it('Its...', () => {
        const obj = {name: 'User', age: 20, endereco: {rua: 'josé ventura'}}
        // cy.wrap(obj).should('have.property', 'name', 'User')        
        cy.wrap(obj).its('name').should('be.equal', 'User')
        cy.wrap(obj).its('endereco').should('have.property', 'rua')
        cy.wrap(obj).its('endereco').its('rua').should('contain', 'ventura')
        cy.wrap(obj).its('endereco.rua').should('contain', 'ventura')


        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    })

    it('Invoke...', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)

        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'texto via invoke')

        cy.window().invoke('alert', 'da pra ver?')

        cy.get('#resultado').invoke('html', '<input type="button" value="hacked!">')
    })
})