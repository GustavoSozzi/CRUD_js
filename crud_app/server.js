//Servidor principal para construcao
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

const conexaoBD = require('./server/database/conexao') //importando o InicializadorBD


dotenv.config({path: 'config.env'}) //carrega as variáveis de ambiente do arquivo config.en
const PORT = process.env.PORT || 8080 //rodando no .env ou porta 8080

//log requests
app.use(morgan('tiny')) //registrar informacoes

//conexao MongoBD
conexaoBD()

//parse request to body-parser
app.use(bodyparser.urlencoded({extended: true})) //dados enviados dos formularios

//set view engine
app.set('view engine', 'ejs')
//app.set('views', path.resolve(__dirname, "views/ejs"))

//carregando assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css'))) //carregando o arquivo CSS
app.use('/img', express.static(path.resolve(__dirname, 'assets/img'))) //carregando o arquivo img
app.use('/js', express.static(path.resolve(__dirname, 'assets/js'))) //carregando o arquivo js


app.set('views', path.join(__dirname, 'views')); //utilizando para abrir o index.ejs
app.set('include', path.join(__dirname, 'include')); //utilizando para abrir o index.ejs


//carregar rotas
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Rodando no servidor http://localhost:${PORT}`)
})