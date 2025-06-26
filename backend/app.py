from flask import Flask, jsonify

app = Flasc(__name__)

@app.route('/')
def home():
    return "Welcome to the Backend API!

@app.route('/api/data')
def get_data():
    data = {
        "message": "Hello from the backend!",
        "version": "1.0",
        "status": "active"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
