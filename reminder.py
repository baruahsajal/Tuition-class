import json
import os
import datetime
import requests

def send_telegram_alert(message):
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    
    if not bot_token or not chat_id:
        print("Error: Automation credentials missing from system context keys.")
        return

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id, 
        "text": message, 
        "parse_mode": "Markdown"
    }
    
    try:
        res = requests.post(url, json=payload, timeout=10)
        if res.status_code == 200:
            print("System Alert: Push notification transferred successfully.")
        else:
            print(f"API Error Return Trace: {res.text}")
    except Exception as e:
        print(f"Network Failure Protocol Exception: {e}")

def run_fee_engine():
    # Parse the shared database file directly
    db_path = os.path.join(os.path.dirname(__file__), 'students.json')
    with open(db_path, 'r') as file:
        students = json.load(file)
        
    current_day = datetime.date.today().day
    due_today = [s for s in students if int(s["due_day"]) == current_day]
    
    if not due_today:
        print(f"Day {current_day}: Data evaluate sequence complete. No matching queues found.")
        return

    # Build the automated cloud telemetry text block
    msg = f"🛰️ *S.Baruah Academy Mainframe Notification* 🛰️\n\n"
    msg += f"Automated ledger scanning complete for *Day {current_day}* of the month.\n"
    msg += f"Please process monthly fee receipts for the following records:\n\n"
    total = 0
    
    for s in due_today:
        msg += f"• *{s['name']}* [Ref: {s['id']}] — Class {s['class']} — *₹{s['fee']}*\n"
        total += int(s["fee"])
        
    msg += f"\n💰 *Aggregated Target Total: ₹{total}*"
    
    send_telegram_alert(msg)

if __name__ == "__main__":
    run_fee_engine()
