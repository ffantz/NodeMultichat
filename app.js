/* Importar configurações do servidor */
var app = require('./config/server');

/* Parametrizar a porta de escuta */
var server = app.listen(5050, () => {});

var socket = require('socket.io').listen(server);
app.set('io', socket);

/* Criar a conexão ppor websocket */
socket.on('connection', (socket) => {
    // socket.on('disconnect', () => {});
    socket.on('msgParaServidor', (data) => {
        /* Diálogo */
        socket.emit('msgParaCliente', data);
        socket.broadcast.emit('msgParaCliente', data);

        /* Participantes */
        if (parseInt(data.apelido_atualizado) === 0) {
            socket.emit('atualizaParticipantes', data);
            socket.broadcast.emit('atualizaParticipantes', data);
        }
    });
});