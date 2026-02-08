from flask import Flask, jsonify
from flask_cors import CORS
from auth import auth_bp
from routes import api_bp
from nasa import fetch_and_store_asteroids
from db import test_connection

from extensions import socketio, scheduler
from scheduler_jobs import update_asteroid_data, check_alerts
import socket_events # Register event handlers

app = Flask(__name__)
app.config["SCHEDULER_API_ENABLED"] = True
CORS(app)

# Initialize Extensions
socketio.init_app(app)

# Check database connectivity before starting scheduler
print("🔍 Checking database connection...")
db_available, db_message = test_connection()

if db_available:
    print(f"✅ {db_message}")
    print("🚀 Starting scheduler jobs...")
    scheduler.init_app(app)
    scheduler.start()
    
    # Schedule Jobs
    # Update data every 6 hours
    scheduler.add_job(id='update_data', func=update_asteroid_data, trigger='interval', hours=6)
    # Check for alerts every 1 minute
    scheduler.add_job(id='check_alerts', func=check_alerts, trigger='interval', minutes=1)
    print("✅ Scheduler jobs initialized")
else:
    print(f"⚠️  {db_message}")
    print("⚠️  Scheduler jobs disabled - database unavailable")
    print("⚠️  Backend will run in limited mode")

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(api_bp, url_prefix="/api")

@app.route("/")
def home():
    return {"status": "Cosmic Watch Backend Running 🚀"}

@app.route("/health")
def health():
    """Health check endpoint showing database status"""
    db_status, db_msg = test_connection()
    return jsonify({
        "status": "running",
        "database": {
            "available": db_status,
            "message": db_msg
        },
        "scheduler": {
            "enabled": db_status
        }
    })

@app.route("/api/fetch-asteroids", methods=["GET"])
def fetch_asteroids():
    try:
        fetch_and_store_asteroids()
        return jsonify({"message": "NASA asteroid data stored in DB 🚀"})
    except Exception as e:
        return jsonify({"error": f"Failed to fetch asteroids: {str(e)}"}), 500

if __name__ == "__main__":
    # Use socketio.run instead of app.run
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, host='0.0.0.0', port=5001)
