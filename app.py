from flask import Flask, render_template, request, redirect, session, send_file, send_from_directory, url_for, flash
from tensorflow.keras.models import load_model
from reportlab.pdfgen import canvas
from datetime import datetime
import sqlite3
import numpy as np
import cv2
import os

app = Flask(__name__, static_folder='Static')
app.config['SECRET_KEY'] = "plantdisease123" 


def init_db():
    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        disease TEXT,
        confidence REAL,
        time TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
    """)

    conn.commit()
    conn.close()


init_db()

# Load trained model
model = load_model("models/plant_model.h5")

# Class names (same order as dataset folders)
classes = [
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy"
]

# Treatments
treatments = {
    "Potato___Early_blight":
        "Apply Mancozeb fungicide and remove infected leaves.",

    "Potato___Late_blight":
        "Apply Copper fungicide and avoid excess moisture.",

    "Potato___healthy":
        "Plant is healthy. No treatment required."
}
#Descriptions
descriptions = {

"Potato___Early_blight":
"Fungal disease causing dark spots on leaves.",

"Potato___Late_blight":
"Serious disease caused by Phytophthora infestans.",

"Potato___healthy":
"Healthy potato plant."
}
#Display
display_names={
    "Potato__Early_blight":
    "Potato Early Blight",

    "Potato__Late_blight":
    "Potato Late Blight",

    "Potato__healthy":
    "Healthy Potato Plant"
}
#cause
causes={
    "Potato__Early_blight":
    "Caused by Alternaria fungus.",

    "Potato__Late_blight":
    "Caused by Phytophtora inferstans",

    "Potato__healthy":
    "NO Disease detected"
}
#Severity
severity={
    "Potato___Early_blight":
    "Medium Risk.",

    "Potato___Late_blight":
    "High Risk.",

    "Potato___healthy":
    "Safe"
}
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(
        'uploads',
        filename
    )

@app.route('/')
def home():
    if 'user' not in session:
        return redirect('/login')
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():
    if 'user' not in session:
        return redirect(url_for('login'))

    file = request.files['leaf']

    path = os.path.join("uploads", file.filename)

    file.save(path)

    # Read image
    img = cv2.imread(path)

    # Resize
    img = cv2.resize(img, (224,224))

    # Normalize
    img = img / 255.0

    # Add batch dimension
    img = np.expand_dims(img, axis=0)

    # Predict
    prediction = model.predict(img)

    class_index = np.argmax(prediction)

    disease = classes[class_index]

    confidence = round(
        np.max(prediction) * 100,
        2
    )

    with open(
        "history.txt","a"
    ) as f:
        f.write(disease+"\n")
    current_time = datetime.now().strftime("%d-%m-%Y %I:%M:%S %p")
    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()
    cursor.execute(''' Insert INTO predictions(disease, confidence, time) VALUES(?,?,?)''', (disease, confidence, current_time))
    conn.commit()
    conn.close()
    print("Disease=",disease)
    treatment=treatments.get(disease,"Treatment not found")
    description=descriptions.get(disease,"Description not found")
    display_disease=display_names.get(disease,disease)
    cause=causes.get(disease,"Cause information not available.")
    risk=severity.get(disease,"Unknown")
    risk = severity.get(disease, "Unknown")
    global last_result
    last_result = {
        "disease": display_disease,
        "confidence": confidence,
        "cause": cause,
        "risk": risk,
        "treatment": treatment,
    }
    
    return render_template(
    "result.html",
    disease=disease,
    confidence=confidence,
    treatment=treatment,
    description=description,
    display_disease=display_disease,
    cause=cause,
    risk=risk,
    current_time=current_time,
    image=file.filename
)

@app.route('/dashboard')

def dashboard():
    if 'user' not in session:
        return redirect('/login')

    conn = sqlite3.connect(
        "predictions.db"
    )

    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM predictions"
    )

    rows = cursor.fetchall()

    conn.close()

    total = len(rows)

    healthy = 0
    early = 0
    late = 0

    for row in rows:

        disease = row[1]

        if disease == "Potato___healthy":
            healthy += 1

        elif disease == "Potato___Early_blight":
            early += 1

        elif disease == "Potato___Late_blight":
            late += 1

    return render_template(

        "dashboard.html",

        total=total,

        healthy=healthy,

        early=early,

        late=late,

        rows=rows

    )

@app.route('/report')
def report():
    if 'user' not in session:
        return redirect(url_for('login'))

    pdf = canvas.Canvas("report.pdf")

    pdf.setFont("Helvetica-Bold", 18)

    pdf.drawString(
        120,
        800,
        "Plant Disease Detection Report"
    )

    pdf.setFont("Helvetica", 12)

    pdf.drawString(
        50,
        740,
        f"Disease: {last_result['disease']}"
    )

    pdf.drawString(
        50,
        710,
        f"Confidence: {last_result['confidence']}%"
    )

    pdf.drawString(
        50,
        680,
        f"Cause: {last_result['cause']}"
    )

    pdf.drawString(
        50,
        650,
        f"Risk Level: {last_result['risk']}"
    )

    pdf.drawString(
        50,
        620,
        f"Treatment: {last_result['treatment']}"
    )

    pdf.save()

    return send_file(
        "report.pdf",
        as_attachment=True
    )
@app.route('/register')
def register_page():
    return render_template("register.html")

@app.route(
    '/register_user',
    methods=['POST']
)
def register_user():
    username = request.form['username']
    password = request.form['password']

    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            INSERT INTO users
            (username,password)
            VALUES(?,?)
            """,
            (username, password)
        )
        conn.commit()
        flash("Registration successful. Please log in.", "success")
        return redirect(url_for('login'))
    except sqlite3.IntegrityError:
        flash("Username already exists. Choose another username.", "error")
        return redirect(url_for('register_page'))
    finally:
        conn.close()

@app.route('/login')
def login():
    return render_template("login.html")

@app.route(
    '/login_user',
    methods=['POST']
)
def login_user():
    username = request.form['username']
    password = request.form['password']

    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT * FROM users
        WHERE username=?
        AND password=?
        """,
        (username, password)
    )

    user = cursor.fetchone()
    conn.close()

    if user:
        session['user'] = username
        return redirect(url_for('home'))

    flash("Invalid username or password.", "error")
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)