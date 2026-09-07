import sqlite3
import os

db_path_env = os.environ.get("DB_PATH")
if db_path_env:
    DB_PATH = db_path_env
else:
    DB_PATH = os.path.join(os.path.dirname(__file__), "nexura.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id               INTEGER PRIMARY KEY AUTOINCREMENT,
            registration_id  TEXT    NOT NULL UNIQUE,
            timestamp        TEXT    NOT NULL,
            event            TEXT    NOT NULL,
            name             TEXT    NOT NULL,
            college          TEXT    NOT NULL,
            email            TEXT    NOT NULL,
            phone            TEXT    NOT NULL,
            team_size        INTEGER NOT NULL DEFAULT 1,
            team_members     TEXT    NOT NULL DEFAULT '[]',
            food             TEXT    NOT NULL DEFAULT 'veg',
            payment_method   TEXT    DEFAULT 'upi',
            transaction_id   TEXT,
            screenshot_path  TEXT,
            payment_status   TEXT    NOT NULL DEFAULT 'pending',
            reg_status       TEXT    NOT NULL DEFAULT 'pending'
        )
    """)
    
    # Migration for existing DB
    cursor = conn.cursor()
    columns = [row[1] for row in cursor.execute("PRAGMA table_info(registrations)").fetchall()]
    if "payment_method" not in columns:
        cursor.execute("ALTER TABLE registrations ADD COLUMN payment_method TEXT DEFAULT 'upi'")
    if "transaction_id" not in columns:
        cursor.execute("ALTER TABLE registrations ADD COLUMN transaction_id TEXT")
        
    conn.commit()
    conn.close()
