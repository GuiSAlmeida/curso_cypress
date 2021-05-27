# Curso Cypress

## 1 - Intro  

Cypress utiliza promises em tudo, ele tem seu próprio ciclo de vida.  

A doc do cypress diz para **não usar** Async Await.

Linha para ajudar vs-code a reconhecer cypress e fornecer snippets.
```js
/// <reference types="cypress" />
```
---  

## 2 - Comandos gerais

`it()` - serve para descrever e criar testes para cada caso.

`describe()` - Serve para descrever e agrupar testes.

`comando.skip()` - Pula o teste ou um grupo de testes.

`comando.only()` - Executa apenas o teste ou grupo especificado.  
**`Only`** Pega apenas um por arquivo para executar. Se houver mais de um vai ser executo o ultimo encontrado.

`debug()` - Pegar mais detalhes sobre algum determinado ponto do teste e imprime no console infos.

`pause()` - Pausa a execução e permite ser executado passo a passo.

`cy.get(<valor>)` - Busca elementos por classe, tag, id, etc.

`cy.contains(<valor>)` - Busca elementos pelo texto.

`cy.reload()` - Recarrega a página.

`cy.window()` - Acessa objeto window da página.

`comando.as(<'alias'>)` - Cria um nome para o evento, operação etc. Podem ser capturados com: `cy.get('@alias')`

### 2.1 - Criar comando personalizado
No arquivo `/cypress/support/commands.js` podem ser adicionados comandos personalizados, passando a seguinte expressão:
```js
Cypress.Commands.add("nomeComando", callback())
```

> Não precisa importá-lo no arquivo de teste.

<details>
<summary>Exemplos</summary>

```js
// código no arquivo commands.js
Cypress.Commands.add("clickAlert", (locator, message) => {
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})
// código no arquivo de testes
it('Alert...', () => {
    cy.clickAlert('#alert', 'Alert Simples')
})
```
</details>  
---  

## 3 - Helpers

`cy.wrap(<objeto>)` - Encapsula como um objeto do cypress. Também usado para gerenciar promises externas.  

<details>
<summary>Exemplos</summary>

```js
it('Wrap...', () => {
    const obj = {name: 'User', age: 20}
    cy.wrap(obj).should('have.property', 'name')

    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    cy.get('#formNome').then($el => {
        // $el.val('funciona com jquery') não é melhor opção, não mostra no log
        cy.wrap($el).type('funciona com cypress')
    })
})
```
</details>  

`comando.its(<propriedade>)` - Acessa uma propriedade do objeto que está no meio da cadeia do cypress.  

<details>
<summary>Exemplos</summary>

```js
it.only('Its...', () => {
    const obj = {name: 'User', age: 20, endereco: {rua: 'josé ventura'}}
    cy.wrap(obj).its('name').should('be.equal', 'User')
    cy.wrap(obj).its('endereco').should('have.property', 'rua')
    // cy.wrap(obj).its('endereco').its('rua').should('contain', 'ventura')
    cy.wrap(obj).its('endereco.rua').should('contain', 'ventura')
})
```
</details>  

`comando.invoke(<função>, [parametros])` - Acessa uma função do objeto que está no meio da cadeia do cypress.  

<details>
<summary>Exemplos</summary>

```js
it.only('Invoke...', () => {
    const soma = (a, b) => a + b;
    cy.wrap({ fn: soma }).invoke('fn', 2, 5).should('be.equal', 7)
})
```
</details>  

`comando.each(<callback()>)` - Semelhante ao `foreach` porém é nativo do cypress, percorre lista de elementos e retorna em uma função callback cada elemento em jquery que podem ser testados de diversas maneiras.  

<details>
<summary>Exemplos</summary>

```js
it('Select almost all with each...', () => {
    cy.get('[name=formComidaFavorita]').each($el => {
        if($el.val() !== 'vegetariano') {
            // $el.click()
            // melhor tornar o $el um objeto do cypress
            cy.wrap($el).click() 
        }
    })
})
```
</details>  

`cy.wait(<ms>)` - Espera no fluxo do teste.  

`cy.tick(<ms>)` - Avança o tempo no fluxo do teste. 

`cy.clock(<Date()>)` - Pode ser usado para definir/resetar uma data padrão no teste.  
> Não pode ser executado mais de 1x no teste.
<details>
<summary>Exemplos</summary>

```js
it('Going back to the past', () => {
    const dt = new Date(1987, 2, 24, 2, 0, 0)
    cy.clock(dt.getTime())
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '24/03/1987')
})
```
</details>  

---

## 4 - Hooks

`before(<callback()>)` - (Before All) Executa função callback passada **antes** de todos os testes de um determinado bloco **`describe`** onde foi adicionado.

`beforeEach(<callback()>)` - (Before Each) Executa função callback passada **antes** de cada teste de um determinado bloco **`describe`** onde foi adicionado.

`after(<callback()>)` - (After All) Executa função callback passada **depois** de todos os testes de um determinado bloco **`describe`** onde foi adicionado.

`afterEach(<callback()>)` - (After Each) Executa função callback passada **depois** de cada teste de um determinado bloco **`describe`** onde foi adicionado.

---  

## 5 - Assertivas

#### **`Expect`**
> Quando já possuimos o valor para fazer a assertiva podemos usar o **Expect**.  
> `expect(<valor>, [mensagem em caso de erro])` - Comando para fazer assertivas.

#### **`Should`**
> Quando temos que buscar e aguardar o valor para fazer a assertiva podemos usar o **Should** encadeado logo após o comando da requisição.
> `comando().should(<comando>, <valor>)`  

#### **`Then`**
> Parecido com should também permite receber resultados do comando anterior encadeado. Mas com algumas diferenças.
> `comando().then(<comando>, <valor>)` 
### 5.1 - Diferenças Should x Then
|Should|then|
|:---:|:---:|
|fica sendo executado</br>ao longo da espera|aguarda receber</br>resultado da promise|
|retorna sempre o elemento|considera o return|
|não consegue fazer busca</br>dentro de outra|faz busca dentro de outra|  

---

#### Comandos mais comuns

`equals(<valor>) | equal(<valor>) | eq(<valor>)` - Comando para verificar igualdade.

`not.comando()` - Usado antes dos comandos para indicar negação

`to.be.comando()` - Pode ser usado para melhorar legibilidade do teste.

`empty` - Verifica se está vazio.

---

### 5.2 - Types
`to.be.a(<tipo>)` - Verifica se o tipo do valor é igual o tipo passado por parâmetro.

<details>
<summary>Exemplos</summary>

```js
it('Types', () => {
    const num = 1;
    const str = 'gui';

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.a('object')
    expect([]).to.be.a('array')
})
```
</details>  

---

### 5.3 - Strings
`length(<valor>)` - Verifica tamanho da string.  

`contains(<valor>)` - Verifica se string possui valor passado por parâmetro.  

`match(<regex>)` - Verifica se string possui regex passada por parâmetro.  

<details>
<summary>Exemplos</summary>

```js
it('String', () => {
    const string = 'gui';

    expect(string).to.be.length(3);
    expect(string).to.contains('gu');
    expect(string).to.match(/^gui$/);
})
```
</details>

---

### 5.4 - Numbers

`below(<valor>)` - valor esperado deve ser abaixo do valor passado por parametro.

`above(<valor>)` - valor esperado deve ser acima do valor passado por parametro.

`closeTo(<valor>, <delta>)` - Verifica se valor é próximo do valor passado de acordo com a precisão passada no delta.

<details>
<summary>Exemplos</summary>

```js
it('Numbers', () => {
    const int = 2;
    const float = 2.22222;

    expect(int).to.be.equal(2);
    expect(int).to.be.above(1);
    expect(int).to.be.below(3);
    expect(float).to.be.equal(2.22222);
    expect(float).to.be.closeTo(2.2, 0.1);
    expect(float).to.be.above(2);
})
```
</details>

---

### 5.5 - Object

`deep.equal() | eql()` - Compara objetos pelo conteúdo.

`include(<valor>)` - Verifica se possui parte do valor passada por parametro.

`have.property(prop, [valor])` - Compara se existe propriedade objeto, como também valor se for passado no segundo parâmetro.

<details>
<summary>Exemplos</summary>

```js
    const obj = {
        a: 1,
        b: 2
    }

    // mesma referencia true
    expect(obj).to.be.equal(obj) 

    // deep | eql comparam conteúdo do objeto e não referência
    expect(obj).deep.equal({ a: 1, b: 2 })
    expect(obj).eql({ a: 1, b: 2 })
    expect(obj).include({ a: 1 })
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty
```
</details>

---

### 5.6 - Arrays

`to.have.members(<valor>)` - Verifica se array possui **todos** os seguintes membros passados por parâmetro.

`to.include.members(<valor>)` - Verifica se array possui os seguintes membros passados por parâmetro.

<details>
<summary>Exemplos</summary>

```js
it('Arrays', () => {
    const array = [1,2,3];

    expect(array).to.have.members([1,2,3])
    expect(array).to.include.members([1,2])
    expect(array).to.not.be.empty
    expect([]).to.be.empty
})
```
</details>

---  

## 6 - Interação com DOM

`type(<texto [{expressão}]>, [{ delay: <ms> }])` - Escreve texto no elemento selecionado previamente. 
> No type podem ser passadas palavras chave dentro de {} junto na string para simular algum comportamento em tempo de execução.  
> Algumas expressões:
> + {backspace} - apaga um caractere
> + {selectall} - seleciona todo texto
> ---
> No campo opcional `delay` é possivel setar um tempo em milisegundos, útil para campos de texto que possuem eventos JS como *debounce* que a medida que se digita ocorre algum evento.


`clear()` - Apaga um campo de texto. 

`click({parametros})` - Efetua evento de click.  
> No click podem ser passadas palavras chave dentro de {} junto na string para simular algum comportamento em tempo de execução.  
> Alguns parametros:
> + {multiple: true} - efetua evento em todos clicáveis selecionados.

`cy.get(<valor>, {parametros})` - Seleciona elementos na página.  
> No get podem ser passadas palavras chave dentro de {} junto na string para simular algum comportamento em tempo de execução.  
> Alguns parametros:
> + {timeout: ms} - tempo de espera tentando selecionar o item, por padrão é 4000ms.  
>
> OBS: para aplicar timeout padrão para toda aplicação alterar **{"defaultCommandTimeout": \<ms>}** no config.json.


`cy.on(<evento>, fn())` - Espera eventos que ocorrem no browser, executa função passada.  
<details>
<summary>Exemplos</summary>

```js
it('Alert...', () => {
    cy.get('#alert').click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal('Alert Simples')
    })
})
```
</details>

---
## 7 - Mocks

`cy.stub()` - Substitui uma função, armazena iterações e controla comportamento de retorno.  

<details>
<summary>Sintaxe</summary>  

```JS  
cy.stub()
cy.stub(object, method)
cy.stub(object, method, replacerFn)
```
</details>
<details>
<summary>Exemplos</summary>

```js
it('Alert com stub...', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
    })
})
it('Stub com várias chamadas...', () => {
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
```
</details>

`cy.fixture(<arquivo>)` - Importa um arquivo para mock que esteja criado dentro da pasta /cypress/fixtures.  

<details>
<summary>Exemplos</summary>

```js
it('Get data form fixture file', () => {
    cy.fixture('userData').as('user').then(function () {
        cy.get('#formNome').type(this.user.nome)
        cy.get('#formSobrenome').type(this.user.sobrenome)
        cy.get(`[name=formSexo][value=${this.user.sexo}]`).click()
        cy.get(`[name=formComidaFavorita][value=${this.user.comida}]`).click()
        cy.get('#formEscolaridade').select(this.user.escolaridade)
        cy.get('#formEsportes').select(this.user.esportes)
    })

    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')
})

```
</details>  

---
## 8 - Plugins
No arquivo `cypress/support/index.js` adicionar a importação do plugin:  
```js
require('nome plugin')
```  


[`Xpath`](https://github.com/cypress-io/cypress-xpath)
```JS  
it('finds list items', () => {
    cy.xpath('//ul[@class="todo-list"]//li')
    .should('have.length', 3)
})
```
---
## 9 - 📄 Documentações
- [Docs cypress assertions](https://docs.cypress.io/guides/references/assertions)
- [Doc Plugins](https://docs.cypress.io/plugins/directory)
- [Doc stub](https://docs.cypress.io/api/commands/stub)
- [Doc eventos window](https://docs.cypress.io/api/events/catalog-of-events#Event-Types)
- [xpath cookbook](https://www.red-gate.com/simple-talk/development/dotnet-development/xpath-css-dom-and-selenium-the-rosetta-stone/)