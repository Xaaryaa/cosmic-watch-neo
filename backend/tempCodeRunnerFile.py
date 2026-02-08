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

                # ---------- INSERT INTO ASTEROIDS ----------
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

                # ---------- INSERT CLOSE APPROACH DATA ----------
                for approach in neo["close_approach_data"]:
                    cur.execute("""
                        INSERT INTO asteroid_approach (
                            approach_id,
                            asteroid_id,
                            approach_date,
                            miss_distance_km,
                            velocity_kmps,
                            orbiting_body,
                            risk_score
                        )
                        VALUES (
                            asteroid_approach_seq.NEXTVAL,
                            :asteroid_id,
                            TO_DATE(:approach_date, 'YYYY-MM-DD'),
                            :miss_distance_km,
                            :velocity_kmps,
                            :orbiting_body,
                            :risk_score
                        )
                    """, {
                        "asteroid_id": int(neo["id"]),
                        "approach_date": approach["close_approach_date"],
                        "miss_distance_km": approach["miss_distance"]["kilometers"],
                        "velocity_kmps": approach["relative_velocity"]["kilometers_per_second"],
                        "orbiting_body": approach["orbiting_body"],
                        "risk_score": calculate_risk(
                            float(approach["miss_distance"]["kilometers"]),
                            float(approach["relative_velocity"]["kilometers_per_second"])
                        )
                    })

        conn.commit()

    finally:
        cur.close()
        conn.close()


# ---------- SIMPLE RISK ENGINE ----------
def calculate_risk(miss_distance_km, velocity_kmps):
    if miss_distance_km < 1_000_000:
        return round(min(1.0, velocity_kmps / 30), 2)
    return round(min(0.3, velocity_kmps / 100), 2)
