const express = require('express');
const { contas, atualizar, apagar, listarContas, depositos, sacar, transferir, extrato, saldo } = require('./controladores/recurso');

const app = express();
app.use(express.json());


//adicionar conta (cadastramento de contas)
app.post('/contas', contas);

// Atualizar conta 
app.put('/contas/:numeroConta/usuario', atualizar);

//apagar conta 
app.delete('/contas/:numero', apagar)

// depositar
app.post('/transacoes/depositar', depositos)

// sacar
app.post('/transacoes/sacar', sacar)

// transferencia
app.post('/transacoes/transferir', transferir)

// saldo
app.get('/contas/saldo', saldo)

// extrato
app.get('/contas/extrato/', extrato)

//requerimento de senha 
const { senha_banco } = require('./intermediarios');

// todos os app abaixo teram a necessidade do uso de senha 
app.get('/contas', senha_banco, listarContas);

module.exports = app;