from flask import Flask, render_template, send_from_directory, request, jsonify
import os

# Cria uma instância chamada 'app' e passa o "__name__" e "template_folder='.'" para navegar nos arquivos estáticos e templates
app = Flask(__name__, template_folder='.')

# Cria uma lista vazia que armazena as tarefas
tarefas = []

# Define a rota para a página inicial do site
@app.route('/')
def index():
    #print("PRIMEIRO")                                              # Mensagem de teste, remover depois
    return render_template('index.html')

# Define a rota para os arquivos estáticos (CSS)
@app.route('/<path:filename>')
def static_files(filename):
    #print("SEGUNDO")                                               # Mensagem de teste, remover depois
    return send_from_directory(os.getcwd(), filename)

# Rota para adicionar uma nova tarefa
@app.route('/adicionar_tarefa', methods=['POST'])
def adicionar_tarefa():
    print("Rota '/adicionar_tarefa' acessada")                      # Mensagem de teste, remover depois
    print("Dados recebidos:", request.form)                         # Mensagem de teste, remover depois
    nome_da_tarefa = request.form.get('nome_da_tarefa')
    print("Valor de nome_da_tarefa:", nome_da_tarefa)               # Mensagem de teste, remover depois

    if nome_da_tarefa:
        tarefas.append(nome_da_tarefa)
        print("Tarefa adicionada com sucesso!")                     # Mensagem de teste, remover depois
        return jsonify({"message": "Tarefa adicionada com sucesso!"}), 200
    else:
        print("Tarefa NÃO adicionada com sucesso!")                 # Mensagem de teste, remover depois
        return jsonify({"error": "Erro ao adicionar tarefa."}), 400

# Executa o aplicativo Flask
if __name__ == '__main__':
    app.run(debug=True)
