import sqlite3

conn = sqlite3.connect("predictions.db")

cursor = conn.cursor()

# Prediction Table
cursor.execute("""

CREATE TABLE IF NOT EXISTS predictions(

id INTEGER PRIMARY KEY AUTOINCREMENT,

disease TEXT,

confidence REAL,

time TEXT

)

""")

# User Table
cursor.execute("""

CREATE TABLE IF NOT EXISTS users(

id INTEGER PRIMARY KEY AUTOINCREMENT,

username TEXT UNIQUE,

password TEXT

)

""")
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
print(cursor.fetchall())

conn.commit()

conn.close()


print("Database Created Successfully")