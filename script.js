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
            }).then(response => response.json())
            .then(data => {
                
                if (data.message) {
                    console.log("Tarefa adicionada com sucesso!");

                    // Atualizar a lista de tarefas no DOM
                    atualizarListaTarefas(data.tarefas);
                    document.getElementById("nome_tarefa").value = "";
                }
                
                else {
                    console.error("Erro ao adicionar tarefa:", data.error);
                }
                
            }).catch(error => {
                console.error("Erro ao adicionar tarefa:", error);
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
            }).then(response => response.json())
            .then(data => {

                if (data.message) {
                    console.log("Tarefa removida com sucesso!");

                    // Atualizar a lista de tarefas no DOM
                    atualizarListaTarefas(data.tarefas);
                }
                
                else {
                    console.error("Erro ao remover tarefa:", data.error);
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

    // Função para atualizar a lista de tarefas no DOM
    function atualizarListaTarefas(tarefas) {
        var containerTarefasLista = document.getElementById("containerTarefasLista");
        containerTarefasLista.innerHTML = "";  // Limpa a lista atual

        // Adiciona cada tarefa à lista
        tarefas.forEach(function(tarefa) {
            var novaTarefa = document.createElement("div");
            novaTarefa.textContent = tarefa.id + " - " + tarefa.nome;
            novaTarefa.classList.add("nova-tarefa");
            novaTarefa.dataset.id = tarefa.id;
            containerTarefasLista.appendChild(novaTarefa);
        });
    }


});
