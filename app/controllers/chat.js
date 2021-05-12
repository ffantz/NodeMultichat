module.exports.iniciaChat = (application, req, res) => {
    req.assert('apelido', 'O nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'O nome ou apelido deve conter entre 3 e 15 caracteres').len(3, 15);

    var errors = req.validationErrors();
    if(errors){
        res.render('index', { validacao: errors });
        return;
    }

    application.get('io').emit('msgParaCliente', {
        nickname: req.body.apelido,
        mensagem: 'Acabou de entrar no chat.'
    });

    res.render("chat", { data: req.body });
};