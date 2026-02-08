from extensions import socketio
from flask_socketio import emit
from flask import request
from db import get_connection
import jwt
import os

JWT_SECRET = os.getenv("JWT_SECRET")

@socketio.on('connect')
def handle_connect():
    print(f"Client connected: {request.sid}")
    
    # Load chat history
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT sender_name, message_text, created_at 
            FROM messages 
            ORDER BY created_at ASC
            FETCH FIRST 50 ROWS ONLY
        """)
        history = []
        for row in cur:
            history.append({
                "user": row[0],
                "message": row[1],
                "timestamp": row[2].isoformat() if row[2] else None
            })
        emit('chat_history', history)
    except Exception as e:
        print(f"Error loading chat history: {e}")
    finally:
        cur.close()
        conn.close()

@socketio.on('disconnect')
def handle_disconnect():
    print(f"Client disconnected: {request.sid}")

@socketio.on('chat_message')
def handle_message(data):
    """
    data = { 'token': '...', 'message': 'Hello world' }
    """
    user_name = "Guest"
    user_id = None
    
    # Authenticate if token provided
    token = data.get('token')
    if token:
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            user_id = payload.get('user_id')
            # Fetch user name if possible, or just use generic 'Operator'
            # For speed, let's just use 'Operator' + ID if we don't want extra DB query, 
            # but better to query name.
            conn = get_connection()
            cur = conn.cursor()
            cur.execute("SELECT full_name FROM users WHERE user_id = :uid", {"uid": user_id})
            result = cur.fetchone()
            if result:
                user_name = result[0]
            cur.close()
            conn.close()
        except Exception as e:
            print(f"Token error: {e}")
            user_name = "Guest"

    message = data.get('message')
    
    # Save to DB
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO messages (user_id, sender_name, message_text)
            VALUES (:uid, :name, :msg)
        """, {"uid": user_id, "name": user_name, "msg": message})
        conn.commit()
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error saving message: {e}")

    # Broadcast to all
    emit('chat_message', {
        "user": user_name,
        "message": message,
        "timestamp": data.get('timestamp')
    }, broadcast=True)
