from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

DATABASE = 'gym_management.db'

def connect_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Permite acessar as colunas por nome
    return conn

@app.route('/students', methods=['GET'])
def get_students():
    conn = connect_db()
    cursor = conn.execute("SELECT * FROM students")
    students = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(students)

@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    conn = connect_db()
    conn.execute(
        "INSERT INTO students (name, age, contact) VALUES (?, ?, ?)",
        (data['name'], data['age'], data['contact'])
    )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Aluno adicionado com sucesso!'})

if __name__ == '__main__':
    # Inicializar banco de dados
    conn = connect_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            contact TEXT NOT NULL
        )
    """)
    conn.close()

    app.run(port=5000)
