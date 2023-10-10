

$("#add_user").submit(function(event) { //adicionar um manipulador de evento a um formulário HTML com o ID add_user
    // Seu código de manipulação de evento aqui
});


$("#update_user").submit(function(event){ //atribui uma função de tratamento de evento para o evento de envio do formulário
    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function(n, i){ //convertendo o array de campos serializados em um objeto
        data[n['name']] = n['value']
    })


    let request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Dados atualizados com sucesso");
    })

})


if(window.location.pathname == "/"){ //verifica se a URL atual da página é igual a "/
    $ondelete = $(".table tbody td a.delete");  //Isso seleciona todos os elementos âncora <a> com a classe "delete"
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Quer realmente deletar?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload(); // exibe um alerta informando que os dados foram excluídos com sucesso e recarrega a página usando location.reload()
            })
        }

    })
}