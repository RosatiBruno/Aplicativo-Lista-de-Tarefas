from flask import Flask, render_template, send_from_directory, request, jsonify
import os
from database import conectar, desconectar

app = Flask(__name__, template_folder='.')

# Função para criar a tabela de tarefas no banco de dados
def criar_tabela() :
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL
        )
    """)
    conn.commit()
    desconectar(conn)

# Insere uma nova tarefa no banco de dados e retorna seu ID
def inserir_tarefa(nome_da_tarefa) :
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tarefas (nome) VALUES (?)", (nome_da_tarefa,))
    conn.commit()

    # Reordena os IDs após uma inclusão
    cursor.execute("SELECT id FROM tarefas ORDER BY id")
    tarefas = cursor.fetchall()
    new_id = 1
    for tarefa in tarefas :

        cursor.execute("UPDATE tarefas SET id = ? WHERE id = ?", (new_id, tarefa[0]))
        new_id += 1

    conn.commit()

    # Obtém todas as tarefas reordenadas
    cursor.execute("SELECT * FROM tarefas")
    tarefas_reordenadas = cursor.fetchall()

    desconectar(conn)
    return tarefas_reordenadas  # Retorna todas as tarefas reordenadas

# Buscar todas as tarefas do banco de dados
def buscar_tarefas() :
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tarefas")
    tarefas = cursor.fetchall()
    desconectar(conn)
    return tarefas

# Remover uma tarefa
def remover_tarefa(numero_da_tarefa_remover) :
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tarefas WHERE id = ?", (numero_da_tarefa_remover,))
    conn.commit()

    # Reordena os IDs após uma remoção
    cursor.execute("SELECT id FROM tarefas ORDER BY id")
    tarefas = cursor.fetchall()
    new_id = 1
    for tarefa in tarefas :

        cursor.execute("UPDATE tarefas SET id = ? WHERE id = ?", (new_id, tarefa[0]))
        new_id += 1

    conn.commit()

    # Obtém todas as tarefas reordenadas
    cursor.execute("SELECT * FROM tarefas")
    tarefas_reordenadas = cursor.fetchall()

    desconectar(conn)
    return tarefas_reordenadas  # Retorna todas as tarefas reordenadas

# Define a rota para a página inicial do site
@app.route('/')
def index() :
    tarefas = buscar_tarefas()
    return render_template('index.html', tarefas=tarefas)

# Define a rota para os arquivos estáticos (CSS)
@app.route('/<path:filename>')
def static_files(filename) :
    return send_from_directory(os.getcwd(), filename)

# Rota para adicionar uma nova tarefa
@app.route('/adicionar_tarefa', methods=['POST'])
def adicionar_tarefa() :
    nome_da_tarefa = request.form.get('nome_da_tarefa')
    
    if nome_da_tarefa:

        tarefas_reordenadas = inserir_tarefa(nome_da_tarefa)
        return jsonify({"message": "Tarefa adicionada com sucesso!", "tarefas": [{"id": t[0], "nome": t[1]} for t in tarefas_reordenadas]}), 200
    
    else :

        return jsonify({"error": "Erro ao adicionar tarefa."}), 400

# Rota para remover uma nova tarefa
@app.route('/remover_tarefa', methods=['POST'])
def remover_tarefa_route() :
    numero_da_tarefa_remover = request.form.get('numero_da_tarefa_remover')

    if numero_da_tarefa_remover :

        tarefas_reordenadas = remover_tarefa(numero_da_tarefa_remover)
        return jsonify({"message": "Tarefa removida com sucesso!", "tarefas": [{"id": t[0], "nome": t[1]} for t in tarefas_reordenadas]}), 200
    
    else :

        return jsonify({"error": "Erro ao remover tarefa."}), 400

# Executa o aplicativo Flask
if __name__ == '__main__' :
    criar_tabela()
    app.run(debug=True)
