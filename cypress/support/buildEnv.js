const buildEnv = () => {
    cy.server()

    cy.route({
        method: 'POST',
        url: '/signin',
        response: {
            id: 1000,
            nome: 'usuario',
            token: 'Uma_string_muito_grande'
        }
    }).as('signin')

    cy.route({
        method: 'GET',
        url: '/saldo',
        response: [
            {
                conta_id: 999,
                conta: 'Carteira',
                saldo: '100.00'
            },
            {
                conta_id: 111,
                conta: 'Banco',
                saldo: '1000.00'
            }
        ]
    }).as('saldo')

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
            }
        ]
    }).as('contas')

    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
            { "conta": "Conta para movimentacoes", "id": 608642, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 657028, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta com movimentacao", "id": 608643, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 657029, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 608644, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 608645, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para saldo", "id": 608646, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 657030, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null },
            { "conta": "Conta para extrato", "id": 608647, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2021-06-25T03:00:00.000Z", "data_pagamento": "2021-06-25T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 657031, "usuario_id": 21505, "transferencia_id": null, "parcelamento_id": null }]
    })
}

export default buildEnv;