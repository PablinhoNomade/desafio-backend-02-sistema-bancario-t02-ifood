module.exports = {
    identificadorId: 1,
    banco: {
        nome: 'Cubos Bank',
        numero: '123',
        agencia: '0001',
        senha: 'Cubos123Bank'
    },
    contas: [
        // array de contas bancárias 
        //  {
        // "numero": "1",
        // "saldo": 0,
        // "usuario": {
        //     "nome": "Foo Bar",
        //     "cpf": "00011122233",
        //     "data_nascimento": "2021-03-15",
        //     "telefone": "71999998888",
        //     "email": "foo@bar.com",
        //     "senha": "1234"
        // }
    ],
    saques: [
        // array de saques
        // {
        //     "data": "2021-08-10 23:40:35",
        //     "numero_conta": "1",
        //     "valor": 10000
        // }
    ],
    depositos: [
        // array de depósitos
        // {
        //     "data": "2021-08-10 23:40:35",
        //     "numero_conta": "1",
        //     "valor": 10000
        // }
    ],
    transferencias: [
        // array de transferências
        // {
        //     "data": "2021-08-10 23:40:35",
        //     "numero_conta_origem": "1",
        //     "numero_conta_destino": "2",
        //     "valor": 10000
        // }
    ]
}