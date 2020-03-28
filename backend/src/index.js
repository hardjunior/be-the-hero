const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
/**
*   Rotas e recursos
 */
/**
*  metodos http
* Get buscar/Listar uma informacao do back-end
* post criar uma informacao no back-end
* put alterar uma informacao no back-end
* Delete: alterar uma informacao no back-end
Para fazer teste de outros metodos pode usar insomnia ou getpostman
 */

/* Tipos de parametros
    Query Params : parametros nomeados enviados na rota apos '?' tipo (filtros , paginacao)
        ex: app.get('/users?name=fulano', (request,response)=>{
            retorno: const params = request.query;
    Route Params : Paramentros utilizados para identificar recursos
        ex: app.get('/users/:id', (request,response)=>{
            retorno: const params = request.params;
    Request body: Corpo da requisição, utilizado para criar ou alterar recursos
    
*/
/*
    Driver: Select * From users
    Query Builder: table('users').select('*').where()
*/
 
app.listen(3333);