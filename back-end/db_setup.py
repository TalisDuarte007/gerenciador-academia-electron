import sqlite3

DATABASE = 'gym_management.db'

def connect_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Permite acessar as colunas por nome
    return conn

def init_db():
    conn = connect_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            contact TEXT NOT NULL,
            address TEXT,
            email TEXT,
            plan_type TEXT,
            plan_start_date TEXT,
            plan_end_date TEXT,
            plan_status TEXT,
            weekly_entries INTEGER DEFAULT 0,
            max_weekly_entries INTEGER NOT NULL,
            photo TEXT,
            created_at TEXT NOT NULL
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            amount REAL NOT NULL,
            payment_date TEXT NOT NULL,
            FOREIGN KEY(student_id) REFERENCES students(id)
        )
    """)
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Banco de dados e tabelas criados com sucesso!")
