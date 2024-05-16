document.addEventListener("DOMContentLoaded", function() {

    /* ADICIONAR TAREFA */
    document.getElementById("btn-adicionar-tarefa").addEventListener("click", function(event) {
        event.preventDefault();

        // Obtém o input do nome da tarefa
        var nomeTarefa = document.getElementById("nome_tarefa").value;
        
        // Verifica se o campo não está vazio
        if (nomeTarefa.trim() !== "") {

            // Envia uma requisição POST para adicionar a tarefa
            fetch('/adicionar_tarefa', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'nome_da_tarefa=' + encodeURIComponent(nomeTarefa)
            }).then(response => {

                if (response.ok) {
                    console.log("Tarefa adicionada com sucesso!");
                }
                
                else {
                    console.error("Erro ao adicionar tarefa:", response.statusText);
                }

            }).catch(error => {
                console.error("Erro ao adicionar tarefa:", error);
            });

            // Cria uma nova tarefa na lista
            var novaTarefa = document.createElement("div");
            novaTarefa.textContent = nomeTarefa;
            novaTarefa.classList.add("nova-tarefa");
            document.getElementById("containerTarefasLista").appendChild(novaTarefa);
            document.getElementById("nome_tarefa").value = "";

            // Atualizar o data-id dos elementos no banco
            var tarefas = document.querySelectorAll(".nova-tarefa");
            tarefas.forEach((tarefa, index) => {
                tarefa.dataset.id = index + 1;
            });

        }
        else {
            alert("Por favor, insira uma tarefa.");
        }
    });


    /* REMOVER TAREFA */                         
    document.getElementById("btn-remover-tarefa").addEventListener("click", function(event) {
        event.preventDefault();

        // Obtém o número da tarefa a ser removida
        var numeroTarefa = document.getElementById("numero_tarefa_remover").value;

        // Verifica se o campo não está vazio
        if (numeroTarefa.trim() !== "") {

            // Envia uma requisição POST para remover a tarefa
            fetch('/remover_tarefa', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'numero_da_tarefa_remover=' + encodeURIComponent(numeroTarefa)
            }).then(response => {

                if (response.ok) {

                    console.log("Tarefa removida com sucesso!");

                    // Remover a tarefa do DOM
                    var tarefaRemovida = document.querySelector('.nova-tarefa[data-id="' + numeroTarefa + '"]');
                    if (tarefaRemovida) {
                        tarefaRemovida.remove();
                    }

                    // Atualizar o data-id dos elementos no banco
                    var tarefas = document.querySelectorAll(".nova-tarefa");
                    tarefas.forEach((tarefa, index) => {
                        tarefa.dataset.id = index + 1;
                    });

                }
                
                else {
                    console.error("Erro ao remover tarefa:", response.statusText);
                }

            }).catch(error => {
                console.error("Erro ao remover tarefa:", error);
            });

            document.getElementById("numero_tarefa_remover").value = "";
        }
        
        else {
            alert("Por favor, insira o número da tarefa a ser removida.");
        }
    });

    
});