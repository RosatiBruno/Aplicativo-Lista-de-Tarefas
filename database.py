import sqlite3

# Função para conectar ao banco de dados
def conectar():
    conn = sqlite3.connect("tarefas.db")
    return conn

# Função para desconectar do banco de dados
def desconectar(conn):
    conn.close()
