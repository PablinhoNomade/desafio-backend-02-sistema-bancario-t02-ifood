let bancodedados = require('../bancodedados');
let { format } = require('date-fns');


// lista todas as contas , precisa de senha 
const listarContas = (req, res) => {

    return res.status(200).json(bancodedados.contas);

};

//cadastra contas , nao precisa de senha 
const contas = (req, res) => {
    //requerimento do body
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const nomeEspaco = ""
    //  comparação e verificação do nome 
    if (!nome || nome.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    };

    // Verificação do nome
    const nome_ = bancodedados.contas.find((user) => {
        return user.usuario.nome == nome
    });
    if (nome_) {
        return res.status(400).json({ Messagem: 'O Nome informado já existe cadastrado!' })
    };

    // comparação e verificação do CPF
    if (!cpf || cpf.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O CPF é obrigatório' });
    };

    // verificação do CPF
    const cpf_ = bancodedados.contas.find((user) => {
        return user.usuario.cpf == cpf
    });
    if (cpf_) {
        return res.status(400).json({ Messagem: 'O CPF informado já existe cadastrado!' })
    };

    //  verificação da data de nascimento (obs não é feito a comparação pois uma pessoa pode ter nascido no mesmo dia que a outra )
    if (!data_nascimento || data_nascimento.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatório' });
    };

    // comparação e verificação do telefone 
    if (!telefone || telefone.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' });
    };

    // verificação do telefone 
    const telefone_ = bancodedados.contas.find((user) => {
        return user.usuario.telefone == telefone
    });
    if (telefone_) {
        return res.status(400).json({ Messagem: 'O Telefone informado já existe cadastrado!' })
    };

    //    comparação e verificação do email 
    if (!email || email.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O E-mail é obrigatório' });
    };

    //     verificação do e-mail 
    const email_ = bancodedados.contas.find((user) => {
        return user.usuario.email == email
    });
    if (email_) {
        return res.status(400).json({ Messagem: 'O E-mail informado já existe cadastrado!' })
    };

    // verificação da senha , tem que ser em formato string
    if (!senha || senha.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória ' });
    };

    const conta = {
        numero: bancodedados.identificadorId++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    bancodedados.contas.push(conta);

    return res.status(200).json();
};

// Atualizar conta 
const atualizar = (req, res) => {
    //requerimento do params
    const { numeroConta } = req.params

    // verifica se a conta existe 
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numeroConta);
    });
    if (!number) {
        return res.status(404).json({ mensagem: 'A conta a ser alterada não foi encontrada' });
    };

    //requerimento do body
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const nomeEspaco = ""
    //verificação do nome 
    if (!nome || nome.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório' });
    };

    //verificação e comparação do CPF*
    if (!cpf || cpf.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O CPF é obrigatório' });
    };
    const cpf_ = bancodedados.contas.find((user) => {
        return user.usuario.cpf == cpf
    });
    if (cpf_) {
        return res.status(400).json({ Messagem: 'O CPF informado já existe cadastrado!' })
    };

    //verificação da data de nascimento 
    if (!data_nascimento || data_nascimento.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatório' });
    };

    // verificação do telefone 
    if (!telefone || telefone.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório' });
    };

    //verificação e comparação do email 
    if (!email || email.trim() === nomeEspaco) {
        return res.status(400).json({ mensagem: 'O E-mail é obrigatório' });
    };
    const email_ = bancodedados.contas.find((user) => {
        return user.usuario.email == email
    });
    if (email_) {
        return res.status(400).json({ Messagem: 'O E-mail informado já existe cadastrado!' })
    };

    // Verificaçao se a senha esta correta 
    let senh = bancodedados.contas.find((number) => {
        return number.usuario.senha == senha;
    });
    if (!senh) {
        return res.status(400).json({ mensagem: 'A senha esta incorreta' });
    };

    //Retira a conta que vai ser atualizada  
    bancodedados.contas = bancodedados.contas.filter((contra) => {
        return contra.numero !== Number(numeroConta);

    });

    // Adiciona a conta com atualizações modificada 
    const cont = {
        numero: Number(numeroConta),
        saldo: number.saldo,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };
    bancodedados.contas.push(cont);

    return res.status(201).json()
};

//Apagar conta , não precisa de senha 
const apagar = (req, res) => {
    const { numero } = req.params

    // verificação se a conta é um numero valido 
    const numero0 = 0
    const naoEnumero = Number(numero) - Number(numero)
    if (numero0 !== naoEnumero) {
        return res.status(404).json({ mensagem: 'O Numero da conta deve ser um número válido.' })
    };

    //  Verificação se a conta existe 
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numero);
    });

    if (!number) {
        return res.status(404).json({ mensagem: 'A conta a ser excluída não foi encontrado' });
    };

    // verificação de saldo na conta e exclusão da conta 
    let saldo0 = bancodedados.contas.find((user) => {
        return user.saldo === numero0;
    });
    if (!saldo0) {
        return res.status(404).json({ mensagem: ' A conta só pode ser removida se o saldo for zero!' });
    };

    //  Exlusão da conta 
    bancodedados.contas = bancodedados.contas.filter((contra) => {
        return contra.numero !== Number(numero);

    });

    return res.status(200).json();

};

//Depositar 
const depositos = (req, res) => {
    //    requerimento do body
    const { numero_conta, valor } = req.body;

    const numero0 = 0
    const naoEnumero = Number(numero_conta) - Number(numero_conta)
    const valores = Number(valor) - Number(valor)

    // verficação se tem valor para depositar e se é positivo 
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor é obrigatório' });
    };
    if (valor <= 0) {
        return res.status(404).json({ mensagem: 'Não é permitir depósitos com valores negativos ou zerados' });
    };
    if (valores !== naoEnumero) {
        return res.status(404).json({ mensagem: 'O valor deve ser um numero válido.' })
    };

    // verficando se é esta numero esta em branco 
    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    };

    // verficiando se esta correto o numero da conta 
    if (numero0 !== naoEnumero) {
        return res.status(404).json({ mensagem: 'O Numero da conta deve ser um número válido.' })
    };

    //  Verificação se a conta existe 
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numero_conta);
    });
    if (!number) {
        return res.status(404).json({ mensagem: ' A conta não existe' });
    };

    // Deposito 
    number.saldo += Number(valor)
    const cont = {
        data: format(new Date(), 'yyyy-mm-dd kk:mm:ss'),
        numero_conta: numero_conta,
        valor: + valor
    };

    bancodedados.depositos.push(cont);
    return res.status(201).json();

};

// Sacar
const sacar = (req, res) => {
    //    requerimento do body
    const { numero_conta, valor, senha } = req.body;
    const numero0 = 0
    const naoEnumero = Number(numero_conta) - Number(numero_conta)


    // verficação se foi digitado valor para saque 
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor é obrigatório' });
    };

    // verficando se o numero de conta esta numero esta em branco 
    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    };

    // verficiando se esta correto o numero da conta 
    if (numero0 !== naoEnumero) {
        return res.status(404).json({ mensagem: 'O Numero da conta deve ser um número válido.' })
    };

    //  Verificação se a conta existe 
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numero_conta);
    })
    if (!number) {
        return res.status(404).json({ mensagem: ' A conta não existe' });
    };

    // Verificação se a senha foi digitada 
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatória' });
    };

    // Verificaçao se a senha esta correta 
    let senh = bancodedados.contas.find((number) => {
        return number.usuario.senha == senha;
    });
    if (!senh) {
        return res.status(400).json({ mensagem: 'A senha esta incorreta' });
    };
    if (number.saldo < valor) {
        return res.status(400).json({ mensagem: 'Não saldo disponivel para este valor de saque' });
    }

    // Saque 
    number.saldo -= valor
    const cont = {
        data: format(new Date(), 'yyyy-mm-dd kk:mm:ss'),
        numero_conta: String(numero_conta),
        valor: valor


    };

    bancodedados.saques.push(cont);
    return res.status(201).json();

};

// Transferir
const transferir = (req, res) => {
    //    requerimento do body
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    //  Verificação se a conta origem existe 
    let number2 = bancodedados.contas.find((user) => {
        return user.numero === Number(numero_conta_origem);
    });
    if (!number2) {
        return res.status(404).json({ mensagem: ' A conta de origem não existe' });
    };
    // verficando-se esta em branco a conta de origem 
    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    };

    //  Verificação se a conta destino existe  
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numero_conta_destino);
    });
    if (!number) {
        return res.status(404).json({ mensagem: ' A conta de destino não existe' });
    };
    // verficando-se esta em branco a conta de destino  
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    };

    // verficação se foi digitado valor para depositar 
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor é obrigatório' });
    };
    // Verificaçao se a senha esta correta 
    let senh = bancodedados.contas.find((number) => {
        return number.usuario.senha == senha;
    });
    if (!senh) {
        return res.status(400).json({ mensagem: 'A senha esta incorreta' });
    };

    // verifica o saldo da conta de origem 
    if (number2.saldo < valor) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    };

    // transferencia
    number.saldo += valor
    number2.saldo -= valor
    const cont = {
        data: format(new Date(), 'yyyy-mm-dd kk:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
    };

    bancodedados.transferencias.push(cont);

    return res.status(201).json();

};

// Saldo
const saldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    //  Verificação se a conta origem existe 
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numero_conta);
    });
    if (!number) {
        return res.status(404).json({ mensagem: ' A conta não existe' });
    };

    // verficando-se esta em branco a conta 
    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    };

    // Verificaçao se a senha esta correta 
    let senh = bancodedados.contas.find((number) => {
        return number.usuario.senha == senha;
    });
    if (!senh) {
        return res.status(400).json({ mensagem: 'A senha esta incorreta' });
    };
    // Mostra saldo 
    const sald = {
        "saldo": number.saldo
    }

    return res.status(201).json(sald);
}

// // Extrato
const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    //  Verificação se a conta origem existe 
    let number = bancodedados.contas.find((user) => {
        return user.numero === Number(numero_conta);
    });
    if (!number) {
        return res.status(404).json({ mensagem: ' Conta bancária não encontada!' });
    };

    // verficando-se esta em branco a conta 
    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatório' });
    };

    // Verificaçao se a senha esta correta 
    let senh = bancodedados.contas.find((number) => {
        return number.usuario.senha == senha;
    });
    if (!senh) {
        return res.status(400).json({ mensagem: 'A senha esta incorreta' });
    };

    //  Filtro de saques 
    const saq = bancodedados.saques.filter((number) => {
        return number.numero_conta == Number(numero_conta)
    });

    // Filtro de transferencia enviadas 
    const tranEnv = bancodedados.transferencias.filter((number) => {
        return number.numero_conta_origem == Number(numero_conta)
    });

    // Filtro de transferencia recebidas
    const tranRec = bancodedados.transferencias.filter((number) => {
        return number.numero_conta_destino == Number(numero_conta)
    });

    // Filtro de depositos da conta 
    const depo = bancodedados.depositos.filter((number) => {
        return number.numero_conta == Number(numero_conta)

    });

    let extrato = {
        depositos: depo,
        saques: saq,
        transferenciasEnviadas: tranEnv,
        transferenciasRecebidas: tranRec
    }

    return res.status(201).json(extrato)
};

module.exports = {
    contas,
    atualizar,
    listarContas,
    apagar,
    depositos,
    sacar,
    transferir,
    saldo,
    extrato
};