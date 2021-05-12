/* Importar o módulo express */
var express = require('express');

/* Importar o módulo consign */
var consign = require('consign');

/* Importar o módulo body-parser */
var bodyParser = require('body-parser');

/* Importar o módulo express-validator */
var expressValidator = require('express-validator');

/* Iniciar o express */
var app = express();

/* Setar variáveis de configuração */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* Configurar Middleware express.static */
app.use(express.static('./app/public'));

/* Configurar Middleware body-parser*/
app.use(bodyParser.urlencoded({ extended: true }));

/* Configurar Middleware express-validator*/
app.use(expressValidator());

/* Autoload de rotas, models e controllers para o app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* Exportar o objeto app */
module.exports = app;