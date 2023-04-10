const senha_banco = (req, res, next) => {
    const { senha_banco } = req.query;
    //senha do administrador
    const senha_admin = 'Cubos123Bank'


    if (!senha_banco) {
        return res.status(401).send('O usuário não está autenticado (logado)');
    }
    if (senha_banco !== senha_admin) {
        return res.status(403).send('O usuário não tem permissão de acessar o recurso solicitado');
    }

    next();

}

module.exports = {
    senha_banco
}