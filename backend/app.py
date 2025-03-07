from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Sample data
accounts = [
    {"id": 1, "name": "Cash", "balance": 5000},
    {"id": 2, "name": "Accounts Receivable", "balance": 3000},
    {"id": 3, "name": "Inventory", "balance": 7500},
]

@app.route('/api/accounts', methods=['GET'])
def get_accounts():
    return jsonify(accounts)

@app.route('/api/accounts/<int:account_id>', methods=['GET'])
def get_account(account_id):
    account = next((a for a in accounts if a['id'] == account_id), None)
    if account:
        return jsonify(account)
    return jsonify({"error": "Account not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
