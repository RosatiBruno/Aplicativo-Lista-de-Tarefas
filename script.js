document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btn-adicionar-tarefa").addEventListener("click", function() {

        var nomeTarefa = document.getElementById("nome_tarefa").value;
        
        if (nomeTarefa.trim() !== "") {
            
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