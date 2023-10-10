//Controlando e gerenciando os arquivos

const userdb = require('../model/model')
let userDb = require('../model/model')

//criar e salvar novo Usuario
exports.create = (req, res) => {

    //validacao do request
    if(!req.body){ //verifica se a solicitação HTTP possui um corpo vazio
        res.status(400).send({message: "empty"})
        return
    }

    //Novo usuario

    const user = new userDb({
        name: req.body.name, //pegando o Nome do Corpo do html
        email: req.body.email, 
        gender: req.body.gender,  
        status: req.body.status  
    })

    //salvar no banco de dados

    user.save(user)
        .then(data => {
            res.send(data)
            res.redirect('/add-user')
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Ocorreu um erro enquanto estava sendo criada a operacao"
            })
        })


}

//retorna todos usuarios ou apenas um usuario
exports.find = (req, res) => {

    if(req.query.id){  //verifica se existe um parâmetro chamado "id
        const id = req.query.id

        userdb.findById(id) //biblioteca para buscar parametro ID
            .then(data => {
                if(!data){
                    res.status(404).send({message: `Usuario Id nao encontrado: ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(error => {
                res.status(500).send({message: "erro"})
            })  
    }
    else{
        userDb.find()
            .then(user => {
                res.send(user)
            })
            .catch(error => {
                res.status(500).send({message: error.message} || 'ocorreu um erro ao buscar informacao')
            })
    }
}

//atualiza um novo usuario pelo id
exports.update = (req, res) => {
   if(!req.body){
        return res.status(400).send({message: 'Campo Id vazio'})
   }

   const id = req.params.id
   userDb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => { //conterá o documento atualizado.
            if(!data){
                res.status(400).send({message: `Nao foi possivel atualizar o usuario ${id} nao existe`})
            }else{
                res.send(data)
            }
        })
        .catch(erro => {
            res.status(500).send({message: "Erro ao atualizar informacao do usuario"})
        })
}

//Deleter um usuario pelo id
exports.delete = (req, res) => {

    const id = req.params.id

    userDb.findByIdAndDelete(id)
            .then(data => {
                if(!data){
                    res.status(400).send({message: `Nao foi possivel deletar o usuario id ${id} talvez esteja errado`})
                }
                else{
                    res.send({message: "Usuario deletado com sucesso"})
                }
            })
            .catch(error => {
                res.status(500).send({
                    message: "Nao foi possivel deletar o Id: " + id
                })
            })
}