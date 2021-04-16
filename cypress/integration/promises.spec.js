it('promises', () => {})

// forma antiga de usar callbacks no lugar de promises
// const getSomething = callback => {
//     setTimeout(() => {
//         callback('resultado');
//     }, 1000)
// };
// const system = () => {
//     console.log('init');
//     getSomething(some => {
//         console.log(`Something is ${some}`);
//         console.log('end')
//     });
// }

//  estrutura promise
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resultado');
        }, 1000)
    })
};
const system = () => {
    console.log('init');
    getSomething().then(some => {
        console.log(`Something is ${some}`)
        console.log('end');
    })
}

system();