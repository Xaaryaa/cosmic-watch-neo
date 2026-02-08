from extensions import socketio, scheduler
from nasa import fetch_and_store_asteroids
from db import get_connection
import oracledb

def update_asteroid_data():
    """Job to fetch fresh data from NASA."""
    print("⏳ Scheduled Task: Fetching Asteroids...")
    try:
        fetch_and_store_asteroids()
        print("✅ Scheduled Task: Asteroids Updated.")
        socketio.emit('feed_update', {'message': 'New data available'})
    except oracledb.Error as e:
        print(f"❌ Scheduled Task Failed (Database Error): {e}")
    except Exception as e:
        print(f"❌ Scheduled Task Failed: {e}")

def check_alerts():
    """Job to check for high-risk asteroids approaching soon."""
    print("⏳ Checking for alerts...")
    try:
        conn = get_connection()
        cur = conn.cursor()
        try:
            # Check for hazardous asteroids approaching in next 24h
            cur.execute("""
                SELECT a.name, aa.miss_distance_km, aa.velocity_kmph, aa.risk_score
                FROM asteroids a
                JOIN asteroid_approach aa ON a.asteroid_id = aa.asteroid_id
                WHERE aa.approach_date >= SYSDATE 
                AND aa.approach_date < SYSDATE + 1
                AND aa.risk_score > 0.5
            """)
            
            alerts = []
            for row in cur:
                alert = {
                    "asteroid": row[0],
                    "miss_distance": row[1],
                    "velocity": row[2],
                    "risk_score": row[3],
                    "message": f"High risk asteroid {row[0]} approaching!"
                }
                alerts.append(alert)
            
            if alerts:
                print(f"🚨 Sending {len(alerts)} alerts!")
                socketio.emit('alert', {'alerts': alerts})
            
        finally:
            cur.close()
            conn.close()
    except oracledb.Error as e:
        print(f"❌ Alert Check Failed (Database Error): {e}")
    except Exception as e:
        print(f"❌ Alert Check Failed: {e}")
