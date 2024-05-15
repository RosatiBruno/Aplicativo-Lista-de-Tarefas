document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btn-adicionar-tarefa").addEventListener("click", function(event) {
        event.preventDefault();

        var nomeTarefa = document.getElementById("nome_tarefa").value;
        
        if (nomeTarefa.trim() !== "") {

            fetch('/adicionar_tarefa', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',         /* Define o padrão dos dados enviados */
                },
                body: 'nome_da_tarefa=' + encodeURIComponent(nomeTarefa)         /* Garante a codificação do nome da tarefa antes de enviar */
            }).then(response => {

                if (response.ok) {
                    console.log("Tarefa adicionada com sucesso!");              /* Mensagem no log do console para consulta */
                }
                
                else {
                    console.error("Erro ao adicionar tarefa:", response.statusText); /* Mensagem no log do console para consulta */
                }

            }).catch(error => {
                console.error("Erro ao adicionar tarefa:", error);              /* Mensagem de erro ao adicionar uma tarefa */
            });
            
            var novaTarefa = document.createElement("div");
            novaTarefa.textContent = nomeTarefa;
            novaTarefa.classList.add("nova-tarefa");
            document.getElementById("containerTarefasLista").appendChild(novaTarefa);
            document.getElementById("nome_tarefa").value = "";

        }
        else {
            alert("Por favor, insira uma tarefa.");                             /* Mensagem caso envie uma tarefa vazia */
        }
    });
});