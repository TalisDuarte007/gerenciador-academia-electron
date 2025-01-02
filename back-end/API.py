from flask import Flask, jsonify, request
from db_setup import connect_db, init_db
from flask_cors import CORS

# Inicializar o banco de dados
init_db()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# Rota para listar todos os estudantes
@app.route('/students', methods=['GET'])
def get_students():
    try:
        conn = connect_db()
        cursor = conn.execute("SELECT * FROM students")
        students = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return jsonify(students)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para adicionar um novo estudante
@app.route('/students', methods=['POST'])
def add_student():
    try:
        data = request.json
        conn = connect_db()
        conn.execute("""
            INSERT INTO students (name, age, contact, address, email, plan_type, plan_frequency, plan_start_date, 
            plan_end_date, plan_status, weekly_entries, photo, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                     (data['name'], data['age'], data['contact'], data.get('address', ''),
                      data.get('email', ''), data['plan_type'], data['plan_frequency'], data['plan_start_date'], data['plan_end_date'],
                      data['plan_status'], data['weekly_entries'], data.get('photo', ''), data['created_at'])
                     )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Aluno adicionado com sucesso!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para buscar um estudante por ID
@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    try:
        conn = connect_db()
        cursor = conn.execute("SELECT * FROM students WHERE id = ?", (student_id,))
        student = cursor.fetchone()
        conn.close()

        if student:
            return jsonify(dict(student))
        return jsonify({'message': 'Aluno não encontrado!'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para adicionar um pagamento
@app.route('/payment', methods=['POST'])
def add_payment():
    try:
        data = request.json
        conn = connect_db()
        conn.execute("""
            INSERT INTO payments (student_id, amount, payment_date) 
            VALUES (?, ?, ?)""",
                     (data['student_id'], data['amount'], data['payment_date'])
                     )
        conn.commit()
        conn.close()
        return jsonify({'message': 'Pagamento adicionado com sucesso!'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Rota para listar todos os pagamentos
@app.route('/payment', methods=['GET'])
def get_payment():
    try:
        conn = connect_db()
        cursor = conn.execute("SELECT * FROM payments")
        payments = [dict(row) for row in cursor.fetchall()]
        conn.close()
        return jsonify(payments)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)

