from flask import Blueprint, jsonify
from db import get_connection

api_bp = Blueprint("api", __name__)

@api_bp.route("/asteroids", methods=["GET"])
def get_asteroids():
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 503
    
    try:
        # Fetch recent asteroids with approach data
        cur.execute("""
            SELECT a.name, a.est_diam_km_max, aa.velocity_kmph, aa.miss_distance_km, aa.risk_score, 
                   a.asteroid_id, a.neo_reference_id
            FROM asteroids a
            JOIN asteroid_approach aa ON a.asteroid_id = aa.asteroid_id
            WHERE aa.approach_date >= SYSDATE - 7
            ORDER BY aa.approach_date DESC
            FETCH FIRST 50 ROWS ONLY
        """)
        
        asteroids = []
        for row in cur:
            asteroids.append({
                "name": row[0],
                "diameter": row[1],
                "velocity": row[2],
                "miss_distance": row[3],
                "risk_score": row[4],
                "id": row[5],
                "neo_reference_id": row[6]
            })
            
        return jsonify(asteroids)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@api_bp.route("/stats", methods=["GET"])
def get_stats():
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 503
    
    try:
        # Get total count
        cur.execute("SELECT COUNT(*) FROM asteroids")
        total_count = cur.fetchone()[0]
        
        # Get hazardous count
        cur.execute("SELECT COUNT(*) FROM asteroids WHERE is_potentially_hazardous = 'YES'")
        hazardous_count = cur.fetchone()[0]
        
        # Get closest approach today/future
        cur.execute("""
            SELECT MIN(miss_distance_km) 
            FROM asteroid_approach 
            WHERE approach_date >= TRUNC(SYSDATE)
        """)
        closest_distance = cur.fetchone()[0]
        
        # Get fastest asteroid
        cur.execute("""
            SELECT MAX(velocity_kmph) 
            FROM asteroid_approach 
            WHERE approach_date >= TRUNC(SYSDATE - 30)
        """)
        fastest_velocity = cur.fetchone()[0]

        return jsonify({
            "total_neos": total_count,
            "hazardous_count": hazardous_count,
            "closest_distance": closest_distance,
            "fastest_velocity": fastest_velocity
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

# ---------------- WATCHLIST ----------------

from middleware import token_required
from flask import request

@api_bp.route("/watchlist", methods=["POST"])
@token_required
def add_to_watchlist(user_id):
    data = request.json
    asteroid_id = data.get("asteroid_id")
    
    if not asteroid_id:
        return jsonify({"error": "Missing asteroid_id"}), 400
    
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 503
        
    try:
        cur.execute("""
            INSERT INTO watchlist (user_id, asteroid_id)
            VALUES (:user_id, :asteroid_id)
        """, {"user_id": user_id, "asteroid_id": int(asteroid_id)})
        conn.commit()
        return jsonify({"message": "Added to watchlist"}), 201
    except Exception as e:
        # Check for duplicate
        if "ORA-00001" in str(e):
             return jsonify({"message": "Already in watchlist"}), 200
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@api_bp.route("/watchlist", methods=["GET"])
@token_required
def get_watchlist(user_id):
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 503
    
    try:
        cur.execute("""
            SELECT a.name, a.asteroid_id, a.neo_reference_id, 
                   aa.miss_distance_km, aa.velocity_kmph, aa.risk_score
            FROM watchlist w
            JOIN asteroids a ON w.asteroid_id = a.asteroid_id
            LEFT JOIN (
                SELECT asteroid_id, miss_distance_km, velocity_kmph, risk_score,
                       ROW_NUMBER() OVER (PARTITION BY asteroid_id ORDER BY approach_date ASC) as rn
                FROM asteroid_approach
                WHERE approach_date >= SYSDATE
            ) aa ON a.asteroid_id = aa.asteroid_id AND aa.rn = 1
            WHERE w.user_id = :user_id
        """, {"user_id": user_id})
        
        watchlist = []
        for row in cur:
            watchlist.append({
                "name": row[0],
                "id": row[1],
                "neo_reference_id": row[2],
                "miss_distance": row[3],
                "velocity": row[4],
                "risk_score": row[5]
            })
        return jsonify(watchlist)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

@api_bp.route("/watchlist/<int:asteroid_id>", methods=["DELETE"])
@token_required
def remove_from_watchlist(user_id, asteroid_id):
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 503
    
    try:
        cur.execute("""
            DELETE FROM watchlist 
            WHERE user_id = :user_id AND asteroid_id = :asteroid_id
        """, {"user_id": user_id, "asteroid_id": asteroid_id})
        conn.commit()
        return jsonify({"message": "Removed from watchlist"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()

# ---------------- PROBED ANALYSIS ----------------

@api_bp.route("/risk-analysis/<int:asteroid_id>", methods=["GET"])
def get_risk_analysis(asteroid_id):
    try:
        conn = get_connection()
        cur = conn.cursor()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {str(e)}"}), 503
    
    try:
        # Get details + history of approaches to see if it's getting closer
        cur.execute("""
            SELECT a.name, a.est_diam_m_max, a.is_potentially_hazardous,
                   aa.approach_date, aa.miss_distance_km, aa.velocity_kmph, aa.risk_score
            FROM asteroids a
            JOIN asteroid_approach aa ON a.asteroid_id = aa.asteroid_id
            WHERE a.asteroid_id = :asteroid_id
            ORDER BY aa.approach_date ASC
        """, {"asteroid_id": asteroid_id})
        
        rows = cur.fetchall()
        if not rows:
            return jsonify({"error": "Asteroid not found"}), 404
            
        # Analysis Logic
        approaches = []
        base_info = {
            "name": rows[0][0],
            "diameter_m": rows[0][1],
            "is_hazardous": rows[0][2]
        }
        
        for row in rows:
            approaches.append({
                "date": row[3],
                "miss_distance": row[4],
                "velocity": row[5],
                "risk_score": row[6]
            })
            
        return jsonify({
            "asteroid": base_info,
            "approaches": approaches,
            "analysis_summary": "Detailed orbital analysis based on stored approach data."
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cur.close()
        conn.close()
