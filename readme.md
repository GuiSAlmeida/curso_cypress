# Curso Cypress

## 1 - Intro  

Cypress utiliza promises em tudo, ele tem seu próprio ciclo de vida.  

A doc do cypress diz para **não usar** Async Await.

Linha para ajudar vs-code a reconhecer cypress e fornecer snippets.
```js
/// <reference types="cypress" />
```
---  
</br>

## 2 - Comandos gerais

`it()` - serve para descrever e criar testes para cada caso.

`describe()` - Serve para descrever e agrupar testes.

`comando.skip()` - Pula o teste ou um grupo de testes.

`comando.only()` - Executa apenas o teste ou grupo especificado.
> **`Only`** Pega apenas um por arquivo para executar. Se houver mais de um vai ser executo o ultimo encontrado.

`debug()` - Pegar mais detalhes sobre algum determinado ponto do teste e imprime no console infos.

`pause()` - Pausa a execução e permite ser executado passo a passo.

`cy.get(<valor>)` - Busca elementos por classe, tag, id, etc.

`cy.contains(<valor>)` - Busca elementos pelo texto.

`cy.reload()` - Recarrega a página.

---  
</br>

## 3 - Hooks

`before(<função>)` - (Before All) Executa função passada **antes** de todos os testes de um determinado bloco **`describe`** onde foi adicionado.

`beforeEach(<função>)` - (Before Each) Executa função passada **antes** de cada teste de um determinado bloco **`describe`** onde foi adicionado.

`after(<função>)` - (After All) Executa função passada **depois** de todos os testes de um determinado bloco **`describe`** onde foi adicionado.

`afterEach(<função>)` - (After Each) Executa função passada **depois** de cada teste de um determinado bloco **`describe`** onde foi adicionado.

---  
</br>

## 4 - Assertivas

#### **`Expect`**
> Quando já possuimos o valor para fazer a assertiva podemos usar o **Expect**.  
> `expect(<valor>, [mensagem em caso de erro])` - Comando para fazer assertivas.

#### **`Should`**
> Quando temos que buscar e aguardar o valor para fazer a assertiva podemos usar o **Should** encadeado logo após o comando da requisição.
> `comando().should(<comando>, <valor>)`  

#### **`Then`**
> Parecido com should também permite receber resultados do comando anterior encadeado. Mas com algumas diferenças.
> `comando().then(<comando>, <valor>)` 
### 4.1 - Diferenças Should x Then
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

### 4.2 - Types
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

### 4.3 - Strings
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

### 4.4 - Numbers

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

### 4.5 - Object

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

### 4.6 - Arrays

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
</br>

## 5 - Interação com DOM

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

`cy.wait(<ms>)` - Espera no fluxo do teste (não recomendado).  

## 6 - References
- [Docs cypress assertions](https://docs.cypress.io/guides/references/assertions)