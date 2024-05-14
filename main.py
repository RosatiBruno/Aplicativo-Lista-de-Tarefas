from flask import Flask, render_template, send_from_directory, request
import os

#Cria uma instância chamada 'app' e passa o "__name__" e "template_folder='.'" p/ navegar nos arquivos estáticos e templates
app = Flask(__name__, template_folder='.')

#Define a rota para a página inicial do site
@app.route('/')
def index() :
    return render_template('index.html')

#Define a rota para os arquivos estáticos (CSS)
@app.route('/<path:filename>')
def static_files(filename) :
    return send_from_directory(os.getcwd(), filename)

# Rota para adicionar uma nova tarefa
@app.route('/adicionar_tarefa', methods=['POST'])
def adicionar_tarefa():
    # Recebe os dados do formulário
    nome_tarefa = request.json.get('nome_tarefa')

#Executa o aplicativo Flask
if __name__ == '__main__' :
    app.run(debug=True)