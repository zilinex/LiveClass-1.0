# app.py
# Author: Mehdi Adibi
# Created on: January 2025
# Last Modified on: -
# Version: 1.0
#
# Description:
# This file contains the Flask application for managing the interactive classroom platform.
# It handles the main app routes:
# - '/' (index): Displays the main page with the current question, response options, and QR code.
# - '/client': Allows clients (students) to submit their responses.
# - '/submit': Accepts the response and updates the stats.
# - '/responses': Provides the current response stats to the client-side app.
#
# Dependencies:
# - Flask
# - qrcode
# - socket
# - base64

from flask import Flask, render_template, request, jsonify, redirect, url_for
import qrcode
from io import BytesIO
import base64
import socket
import sys
import os
import argparse
import json
from html import escape

# Check if a JSON file is provided via command line argument
if len(sys.argv) != 2:
    print("Error: Please provide the path to the questions JSON file.")
    sys.exit(1)

json_file_path = sys.argv[1]

# Check if the file exists
if not os.path.exists(json_file_path):
    print(f"Error: The file '{json_file_path}' was not found.")
    print("Please create a questions.json file in the correct format.")
    sys.exit(1)

# Load questions from the provided JSON file
with open(json_file_path, 'r') as f:
    questions = json.load(f)
    
print(f'{questions}')

app = Flask(__name__)

hostname = socket.gethostname()
## getting the IP address using socket.gethostbyname() method
ip_address = socket.gethostbyname(hostname)
## printing the hostname and ip_address
print(f"Hostname: {hostname}")
print(f"IP Address: {ip_address}")

# Initialize a dictionary to store responses
#responses = {key: 0 for key in options}


current_question_idx = 0
responses = {}
client_counter = 0

# Initialize the first question responses
def reset_stats():
    global responses
    global client_counter
    client_counter = 0
    responses = {option: 0 for option in questions[current_question_idx]["options"]}

# Initialize the first question
reset_stats()

@app.route('/')
def index():
    global client_count
    global current_question_idx, responses
    
    current_question = questions[current_question_idx]
    question_text = escape(current_question["question"])
    # Generate the QR code
    qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_L, box_size=10, border=4)
    qr.add_data(f'http://{ip_address}:5000/client')  # The URL where students submit their response
    qr.make(fit=True)

    # Create an image from the QR Code instance
    img = qr.make_image(fill='black', back_color='white')

    # Save the image to a BytesIO object
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    # Encode the image in base64
    img_base64 = base64.b64encode(img_io.getvalue()).decode('utf-8')
    
    
    total_responses = sum(responses.values())
    response_percentages = {option: (round(count / total_responses * 100) if total_responses > 0 else 0) for option, count in  responses.items()}

    print(f'{response_percentages}')
    
    prev_disabled = current_question_idx == 0
    next_disabled = current_question_idx == len(questions) - 1
    
    # Render the question template and pass the QR code image and responses
    return render_template('question.html', 
                           question=question_text, 
                           options=current_question["options"], 
                           qr_code_img=img_base64, 
                           responses=responses, 
                           client_count=client_counter, 
                           response_percentages=response_percentages, 
                           total_responses=total_responses,
                           prev_disabled=prev_disabled, 
                           next_disabled=next_disabled
                           )
      

@app.route('/client')
def client():
    global client_counter
    global current_question_idx
    client_counter += 1
    print(f'participants: {client_counter}')
    # Render the client-side (student) page where they can submit responses
    return render_template('client.html', question=questions[current_question_idx]["question"], options=questions[current_question_idx]["options"])

@app.route('/submit', methods=['POST'])
def submit():
    # Handle the student's response and update the response count
    data = request.get_json();
    selected_option = data.get('choice');
    print(f"Received answer: {selected_option}")
    if selected_option in responses:
        responses[selected_option] += 1
    return jsonify(responses)  # Return updated response count as JSON

@app.route('/responses')
def get_responses():
    # Return the current responses as JSON
    global client_counter
    print(f"Sending data: responses={responses}, client_count={client_counter}")
    return jsonify({'responses': responses,
        'client_count': client_counter})

@app.route('/next')
def next_question():
    global current_question_idx
    if current_question_idx < len(questions) - 1:
        current_question_idx += 1
        reset_stats()
    return redirect('/')

@app.route('/back')
def back_question():
    global current_question_idx
    if current_question_idx > 0:
        current_question_idx -= 1
        reset_stats()
    return redirect('/')
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
#    app.run(debug=True)
