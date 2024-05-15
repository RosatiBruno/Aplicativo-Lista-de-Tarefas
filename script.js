document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btn-adicionar-tarefa").addEventListener("click", function(event) {
        event.preventDefault();

        var nomeTarefa = document.getElementById("nome_tarefa").value;
        
        if (nomeTarefa.trim() !== "") {

            fetch('/adicionar_tarefa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'nome_da_tarefa=' + encodeURIComponent(nomeTarefa)
            }).then(response => {
                if (response.ok) {
                    console.log("Tarefa adicionada com sucesso!");
                } else {
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
});