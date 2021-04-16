/// <reference types="cypress" />

it('Truthy', () => {
    const b = true;

    expect(b, `Deve ser ${b}`).to.be.true;
    expect(!b, `Não deve ser ${b}`).not.to.be.true;
    // expect(!b, `Não deve ser ${b}`).not.to.be.null;
    // expect(!b, `Não deve ser ${b}`).not.to.be.undefined;
})

it('Equality', () => {
    const a = 1;

    expect(a, `Deve ser ${a}`).equal(1);
    expect(a, `Deve ser ${a}`).not.equal(2);
})

it('Object equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).to.be.equal(obj) // mesma referencia true
    expect(obj).not.to.be.equal({ a: 1, b: 2 }) // referencia diferente

    expect(obj).deep.equal({ a: 1, b: 2 })
    expect(obj).eql({ a: 1, b: 2 })
    expect(obj).include({ a: 1 })
    expect(obj).to.have.property('b')
    expect(obj).to.have.property('b', 2)
    expect(obj).to.not.be.empty
})

it('Arrays', () => {
    const array = [1,2,3];

    expect(array).to.have.members([1,2,3])
    expect(array).to.include.members([1,2])
    expect(array).to.not.be.empty
    expect([]).to.be.empty
})

it('Types', () => {
    const num = 1;
    const str = 'gui';

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.a('object')
    expect([]).to.be.a('array')
})

it('String', () => {
    const string = 'gui';

    expect(string).to.be.equal('gui');
    expect(string).to.be.length(3);
    expect(string).to.contains('gu');
    expect(string).to.match(/^gui$/);
    expect(string).to.match(/\w+/);
})

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