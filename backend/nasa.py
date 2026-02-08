import requests
import os
from datetime import datetime
from db import get_connection
from dotenv import load_dotenv

load_dotenv()

NASA_API_KEY = os.getenv("NASA_API_KEY")
NASA_URL = "https://api.nasa.gov/neo/rest/v1/feed"


def fetch_and_store_asteroids():
    today = datetime.utcnow().strftime("%Y-%m-%d")

    params = {
        "start_date": today,
        "end_date": today,
        "api_key": NASA_API_KEY
    }

    response = requests.get(NASA_URL, params=params)
    response.raise_for_status()
    data = response.json()

    conn = get_connection()
    cur = conn.cursor()

    try:
        for date in data["near_earth_objects"]:
            for neo in data["near_earth_objects"][date]:

                # ================== ASTEROIDS TABLE ==================
                cur.execute("""
                    MERGE INTO asteroids a
                    USING dual
                    ON (a.asteroid_id = :asteroid_id)
                    WHEN NOT MATCHED THEN
                    INSERT (
                        asteroid_id,
                        neo_reference_id,
                        name,
                        nasa_jpl_url,
                        absolute_magnitude_h,
                        is_potentially_hazardous,
                        is_sentry_object,
                        est_diam_km_min,
                        est_diam_km_max,
                        est_diam_m_min,
                        est_diam_m_max,
                        est_diam_miles_min,
                        est_diam_miles_max,
                        est_diam_feet_min,
                        est_diam_feet_max
                    )
                    VALUES (
                        :asteroid_id,
                        :neo_reference_id,
                        :name,
                        :nasa_jpl_url,
                        :absolute_magnitude_h,
                        :is_potentially_hazardous,
                        :is_sentry_object,
                        :est_diam_km_min,
                        :est_diam_km_max,
                        :est_diam_m_min,
                        :est_diam_m_max,
                        :est_diam_miles_min,
                        :est_diam_miles_max,
                        :est_diam_feet_min,
                        :est_diam_feet_max
                    )
                """, {
                    "asteroid_id": int(neo["id"]),
                    "neo_reference_id": neo["neo_reference_id"],
                    "name": neo["name"],
                    "nasa_jpl_url": neo["nasa_jpl_url"],
                    "absolute_magnitude_h": neo["absolute_magnitude_h"],
                    "is_potentially_hazardous": "YES" if neo["is_potentially_hazardous_asteroid"] else "NO",
                    "is_sentry_object": "YES" if neo["is_sentry_object"] else "NO",
                    "est_diam_km_min": neo["estimated_diameter"]["kilometers"]["estimated_diameter_min"],
                    "est_diam_km_max": neo["estimated_diameter"]["kilometers"]["estimated_diameter_max"],
                    "est_diam_m_min": neo["estimated_diameter"]["meters"]["estimated_diameter_min"],
                    "est_diam_m_max": neo["estimated_diameter"]["meters"]["estimated_diameter_max"],
                    "est_diam_miles_min": neo["estimated_diameter"]["miles"]["estimated_diameter_min"],
                    "est_diam_miles_max": neo["estimated_diameter"]["miles"]["estimated_diameter_max"],
                    "est_diam_feet_min": neo["estimated_diameter"]["feet"]["estimated_diameter_min"],
                    "est_diam_feet_max": neo["estimated_diameter"]["feet"]["estimated_diameter_max"]
                })

                # ================== ASTEROID_APPROACH TABLE ==================
                for approach in neo["close_approach_data"]:
                    cur.execute("""
                        INSERT INTO asteroid_approach (
                            approach_id,
                            asteroid_id,
                            approach_date,
                            approach_date_full,
                            epoch_date_close_approach,
                            velocity_kmps,
                            velocity_kmph,
                            velocity_mph,
                            miss_distance_au,
                            miss_distance_lunar,
                            miss_distance_km,
                            miss_distance_miles,
                            orbiting_body,
                            risk_score
                        )
                        VALUES (
                            asteroid_approach_seq.NEXTVAL,
                            :asteroid_id,
                            TO_DATE(:approach_date, 'YYYY-MM-DD'),
                            :approach_date_full,
                            :epoch_date,
                            :velocity_kmps,
                            :velocity_kmph,
                            :velocity_mph,
                            :miss_au,
                            :miss_lunar,
                            :miss_km,
                            :miss_miles,
                            :orbiting_body,
                            :risk_score
                        )
                    """, {
                        "asteroid_id": int(neo["id"]),
                        "approach_date": approach["close_approach_date"],
                        "approach_date_full": approach.get("close_approach_date_full"),
                        "epoch_date": approach.get("epoch_date_close_approach"),
                        "velocity_kmps": float(approach["relative_velocity"]["kilometers_per_second"]),
                        "velocity_kmph": float(approach["relative_velocity"]["kilometers_per_hour"]),
                        "velocity_mph": float(approach["relative_velocity"]["miles_per_hour"]),
                        "miss_au": float(approach["miss_distance"]["astronomical"]),
                        "miss_lunar": float(approach["miss_distance"]["lunar"]),
                        "miss_km": float(approach["miss_distance"]["kilometers"]),
                        "miss_miles": float(approach["miss_distance"]["miles"]),
                        "orbiting_body": approach["orbiting_body"],
                        "risk_score": calculate_risk(
                            float(approach["miss_distance"]["kilometers"]),
                            float(approach["relative_velocity"]["kilometers_per_hour"]),
                            neo["estimated_diameter"]["meters"]["estimated_diameter_max"],
                            "YES" if neo["is_potentially_hazardous_asteroid"] else "NO"
                        )
                    })

        conn.commit()

    finally:
        cur.close()
        conn.close()


# ================== RISK CALCULATION ==================
def calculate_risk(miss_distance_km, velocity_kmph, diameter_m, is_hazardous):
    # Weights
    W_HAZARD = 0.30
    W_DIST = 0.30
    W_DIAM = 0.25
    W_VEL = 0.15

    # 1. Hazardous Status Score (0 or 1)
    s_hazard = 1.0 if is_hazardous == "YES" else 0.0

    # 2. Distance Score (Inverse log scale)
    # 1 LD approx 384,400 km. Cap at 1.0 for < 1 LD. Decay to 0 at ~0.05 AU (7.5M km)
    try:
        import math
        # Logarithmic decay: closer = higher score
        # Using log10(miss_distance) to scale. 
        # Target: < 400,000km -> 1.0, > 10,000,000km -> 0.0
        if miss_distance_km < 400000:
            s_dist = 1.0
        elif miss_distance_km > 10000000:
            s_dist = 0.0
        else:
            # Linear interpolation in log space
            min_log = math.log10(400000)
            max_log = math.log10(10000000)
            curr_log = math.log10(miss_distance_km)
            s_dist = 1.0 - ((curr_log - min_log) / (max_log - min_log))
    except:
        s_dist = 0.0

    # 3. Diameter Score
    # Potentially catastrophic > 140m (NASA definition PHA)
    # Cap 1.0 at 1km (1000m)
    if diameter_m > 1000:
        s_diam = 1.0
    else:
        s_diam = diameter_m / 1000.0

    # 4. Velocity Score
    # Typical range 10k - 100k km/h? Actually avg is 20-25 km/s -> 70k-90k km/h
    # Cap at 100,000 km/h
    if velocity_kmph > 100000:
        s_vel = 1.0
    else:
        s_vel = velocity_kmph / 100000.0

    total_score = (s_hazard * W_HAZARD) + (s_dist * W_DIST) + (s_diam * W_DIAM) + (s_vel * W_VEL)
    
    # Scale to 0-10 for display friendliness, but DB expects 0-1? 
    # Current code seemed to return 0-1. Let's stick to 0-1 but improved.
    return round(min(1.0, max(0.0, total_score)), 4)
