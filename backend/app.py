from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app) # Enable CORS for all origins

app.route('/api/hello', methods=['GET'])
def hello_world():
    return jsonify(message="Hello from the backend API")

app_route('/', methods=['GET'])
def root():
    return "Backend is running!"

imf __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
