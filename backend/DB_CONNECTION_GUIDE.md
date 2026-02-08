# Database Connection Guide

This guide explains how to connect your backend to an Oracle Database hosted on a team member's local machine.

## 1. Prerequisites for Team Member (Host)

The team member hosting the database needs to expose it to the local network.

### Step 1: Find Local IP Address
- **Windows**: Open Command Prompt (`cmd`) and run `ipconfig`. Look for `IPv4 Address` (e.g., `192.168.1.5`).
- **Mac/Linux**: Open Terminal and run `ifconfig` or `ip a`. Look for `inet` under `en0` or `wlan0`.

### Step 2: Configure Oracle Listener
1. Locate `listener.ora` file (usually in `$ORACLE_HOME/network/admin` or similar).
2. Ensure the listener is listening on the network IP, not just `localhost`.
   ```ini
   (DESCRIPTION =
     (ADDRESS = (PROTOCOL = TCP)(HOST = 0.0.0.0)(PORT = 1521))
   )
   ```
   *Note: `0.0.0.0` listens on all interfaces (recommended for easier setup). Alternatively, use the specific IP address found in Step 1.*

3. Restart the listener:
   ```bash
   lsnrctl stop
   lsnrctl start
   ```

### Step 3: Configure Firewall (Windows 11)

**Option A: Disable Firewall Temporarily (Easiest for testing)**
1. Click **Start** and type **"Firewall"**.
2. Select **"Windows Defender Firewall"** (Control Panel).
3. Click **"Turn Windows Defender Firewall on or off"** on the left.
4. Select **"Turn off Windows Defender Firewall"** for both **Private** and **Public** networks.
5. Click **OK**.

**Option B: Allow Port 1521 (Recommended for long term)**
1. Click **Start**, type **"Advanced Security"**, and open **"Windows Defender Firewall with Advanced Security"**.
2. Click **Inbound Rules** (left panel) > **New Rule...** (right panel).
3. Select **Port** and click **Next**.
4. Select **TCP** and enter **1521** in "Specific local ports". Click **Next**.
5. Select **Allow the connection**. Click **Next** through the rest.
6. Name it **"Oracle DB Access"** and click **Finish**.

---

## 2. Setup for You (Client)

### Step 1: Install Python Dependencies
Open your terminal in the `backend` folder and run:

```bash
pip install -r requirements.txt
```

### Step 2: Configure Environment Variables
1. Open `backend/.env`.
2. Update `DB_DSN` with your team member's IP address.

**Example**:
If team member's IP is `192.168.1.45` and service name is `xepdb1`:

```ini
DB_USER=Astroid_tracker
DB_PASSWORD=a1
DB_DSN=192.168.1.45:1521/xepdb1
```

### Step 3: Test Connection
Run the test script to verify the connection:

```bash
python3 test_db.py
```

If successful, you will see:
`✅ Oracle DB connected successfully`
