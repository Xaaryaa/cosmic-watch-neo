from flask import Blueprint, request, jsonify
import bcrypt
import jwt
import datetime
import os
from db import get_connection
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint("auth", __name__)
JWT_SECRET = os.getenv("JWT_SECRET")

# ---------------- REGISTER ----------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json

    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Missing email or password"}), 400

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
            INSERT INTO users (
                user_id, full_name, email, password_hash, role, is_verified
            ) VALUES (
                users_seq.NEXTVAL, :full_name, :email, :password_hash, 'user', 'NO'
            )
        """, {
            "full_name": data.get("full_name"),
            "email": data["email"],
            "password_hash": hashed_password
        })

        conn.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        cur.close()
        conn.close()


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT user_id, password_hash, role, is_verified
        FROM users
        WHERE email = :email
    """, {"email": data["email"]})

    user = cur.fetchone()
    cur.close()
    conn.close()

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    user_id, db_password, role, is_verified = user

    if not bcrypt.checkpw(
        data["password"].encode("utf-8"),
        db_password.encode("utf-8")
    ):
        return jsonify({"error": "Invalid email or password"}), 401

    if is_verified == "NO":
        return jsonify({"error": "Email not verified"}), 403

    token = jwt.encode(
        {
            "user_id": user_id,
            "role": role,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token
    })
