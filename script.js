document.addEventListener("DOMContentLoaded", function() {

    /* ADICIONAR TAREFA */
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
                    console.log("Tarefa adicionada com sucesso!");
                }
                
                else {
                    console.error("Erro ao adicionar tarefa:", response.statusText);
                }

            }).catch(error => {
                console.error("Erro ao adicionar tarefa:", error);
            });
            
            var novaTarefa = document.createElement("div");
            novaTarefa.textContent = nomeTarefa;
            novaTarefa.classList.add("nova-tarefa");
            document.getElementById("containerTarefasLista").appendChild(novaTarefa);
            document.getElementById("nome_tarefa").value = "";

        }
        else {
            alert("Por favor, insira uma tarefa.");
        }
    });


    /* REMOVER TAREFA */                         /* EM PROCESSO */
    document.getElementById("btn-remover-tarefa").addEventListener("click", function(event) {
        event.preventDefault();

        var numeroTarefa = document.getElementById("numero_tarefa_remover").value;

        if (numeroTarefa.trim() !== "") {

            fetch('/remover_tarefa', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',         /* Define o padrão dos dados enviados */
                },
                body: 'numero_da_tarefa_remover=' + encodeURIComponent(numeroTarefa) /* Garante a codificação do número (id) da tarefa antes de enviar */
            }).then(response => {

                if (response.ok) {

                    console.log("Tarefa removida com sucesso!");

                    // Remover a tarefa do DOM
                    var tarefas = document.querySelectorAll(".nova-tarefa");
                    tarefas.forEach(tarefa => {
                        if (tarefa.dataset.id === numeroTarefa) {
                            tarefa.remove();
                        }
                    });

                    //Alterando os IDs
                    var new_id = 1;
                    tarefas.forEach(tarefa => {
                        tarefa.dataset.id = new_id;
                        new_id++;
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


}); /* DOM */