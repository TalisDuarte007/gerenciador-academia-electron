from flask import Flask, jsonify, request
from db_setup import connect_db

app = Flask(__name__)


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
    conn.execute("""
        INSERT INTO students (name, age, contact, address, email, plan_type, plan_start_date, 
        plan_end_date, plan_status, max_weekly_entries, photo, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                 (data['name'], data['age'], data['contact'], data.get('address', ''),
                  data.get('email', ''), data['plan_type'], data['plan_start_date'], data['plan_end_date'],
                  data['plan_status'], data['max_weekly_entries'], data.get('photo', ''), data['created_at'])
                 )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Aluno adicionado com sucesso!'})


@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    conn = connect_db()
    cursor = conn.execute("SELECT * FROM students WHERE id = ?", (student_id,))
    student = cursor.fetchone()
    conn.close()

    if student:
        return jsonify(dict(student))
    return jsonify({'message': 'Aluno não encontrado!'}), 404

@app.route('/payment', methods=['POST'])
def add_payment():
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

@app.route('/payment', methods=['GET'])
def get_payment():
    conn = connect_db()
    cursor = conn.execute("SELECT * FROM payments")
    payments = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(payments)



if __name__ == '__main__':
    app.run(port=5000)
