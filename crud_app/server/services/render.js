const axios = require('axios')


exports.homeRoutes =  async (req, res) => { //rotas inicial
    //enviando uma requisicao para /api/users

    axios.get('http://localhost:3000/api/users')
        .then((response) => {
            console.log(response)
            res.render('index', {users: response.data}) //resposta data da promise enviada ao localhost
        })
        .catch(error => {
            res.send(error)
        })
}

exports.add_user = (req, res) => { //adicionar usuarios
    res.render('add_user')
}

exports.update_user = (req, res) => { //atualizar usuarios
    axios.get("http://localhost:3000/api/users", { params: { id: req.query.id } }) //consulta query
        .then(function(userdata) { // Correção: remova o número "0" após "userdata"
            res.render('update_user', { user: userdata.data });
        })
        .catch(function(error) {
            console.error(error);
                res.send(error)
        });
}
