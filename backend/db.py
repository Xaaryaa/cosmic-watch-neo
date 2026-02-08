import oracledb
import os
from dotenv import load_dotenv

load_dotenv()

def get_connection():
    """
    Get a connection to the Oracle database with timeout.
    Raises oracledb.Error if connection fails.
    """
    try:
        # Create connection parameters with timeout
        params = oracledb.ConnectParams()
        params.parse_connect_string(os.getenv("DB_DSN"))
        
        return oracledb.connect(
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            params=params,
            tcp_connect_timeout=5.0  # 5 second connection timeout
        )
    except oracledb.Error as e:
        error_obj, = e.args
        print(f"❌ Database Connection Failed: {error_obj.message}")
        print(f"   DSN: {os.getenv('DB_DSN')}")
        print(f"   User: {os.getenv('DB_USER')}")
        raise

def test_connection():
    """
    Test if database connection is available.
    Returns (success: bool, message: str)
    """
    try:
        conn = get_connection()
        conn.close()
        return True, "Database connection successful"
    except oracledb.Error as e:
        error_obj, = e.args
        return False, f"Database unavailable: {error_obj.message}"
    except Exception as e:
        return False, f"Database unavailable: {str(e)}"

