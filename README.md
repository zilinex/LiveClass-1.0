
# LiveClass: Interactive Classroom Platform

**Author**: Mehdi Adibi  
**Date**: January 2025  
**Version**: 1.0  

## Overview

LiveClass is an interactive classroom platform built with Flask. It allows teachers to present questions to students, track responses, and display real-time statistics. Students can participate by scanning a QR code and selecting responses. 

The platform supports:
- Real-time statistics display.
- QR code generation for student participation.
- Easy question and response management through a JSON file.

## Technologies Used

- **Flask** (Python web framework)
- **Python** (Programming Language)
- **HTML** (Frontend for displaying questions and responses)
- **CSS** (Styling the interface)
- **JavaScript** (Client-side functionality)

## Folder Structure

```plaintext
InteractiveClassroom/
│
├── app.py                # Main Flask application file
├── templates/            # Folder containing HTML templates
│   ├── question.html     # Template for displaying questions and responses
│   └── client.html       # Template for client-side (student) interaction
├── static/               # Folder for static assets like images, CSS, and JS
│   ├── css/              # CSS files
│   │   └── styles.css    # Main stylesheet (used in question.html)
│   │   └── client.css    # Main stylesheet (used in clinet.html)
│   ├── js/               # JavaScript files 
│   │   └── scripts.js    # Client-side scripts (used in question.html)
│   │   └── client.js     # Client-side scripts (used in client.html)
│   └── images/           # Image files
│       └── logo.png      # Logo image
├── questions.json        # JSON file containing questions and answers
└── README.md             # This file
```

## Installation Instructions

### 1. Install Python
Ensure you have Python 3.7+ installed on your system.

### 2. Install Dependencies
Run the following command to install the necessary dependencies:

```bash
pip install flask
```

### 3. Running the Application
To run the app, use the following command syntax:

```bash
python app.py <path_to_questions_json_file>
```

Example:

```bash
python app.py questions.json
```

This will start the Flask web server and allow you to access the interactive classroom platform at `http://127.0.0.1:5000/`.

### 4. Create a questions.json File

Your `questions.json` file should follow this structure:

```json
{
  "questions": [
    {
      "question": "Do you find interactive classes beneficial?",
      "options": ["Yes", "No"]
    },
    {
      "question": "What is your preferred learning method?",
      "options": ["Visual", "Auditory", "Kinesthetic"]
    }
  ]
}
```

Each question should include:
- A `question` field for the text of the question.
- An `options` array with the available answer choices.

1. **In Excel:**
   - Create a table with two columns: one for the question and the other for the options.
   - Fill in the rows with your questions and their corresponding options.
   - Save the file as a `.csv` file.
   - Use an online tool like [CSV to JSON Converter](https://csvjson.com/csv2json) to convert your `.csv` file into a `questions.json` file.
2. **In Google Sheets:**
   - Create a Google Sheets document with two columns: one for the question and one for the options.
   - Fill in the rows with the questions and their corresponding options.
   - After entering all the questions and options, go to **File > Download** and choose **Comma-separated values (.csv)** to download the sheet as a `.csv` file.
   - Use an online tool like [CSV to JSON Converter](https://csvjson.com/csv2json) to convert your `.csv` file into a `questions.json` file.


### 5. Accessing the App from Other Devices (Windows Firewall)

If the app is not accessible from other devices, it may be blocked by your Windows firewall. To fix this:

1. Go to **Control Panel > System and Security > Windows Defender Firewall > Advanced Settings**.
2. Create an inbound rule to allow traffic on port 5000 (the default Flask port):
a. In the **Windows Firewall with Advanced Security** window, select **Inbound Rules** on the left.
b. Click on **New Rule** in the right-hand menu.
c. Select **Port**, then click **Next**.
d. Choose **TCP** and enter **5000** in the **Specific local ports** field.
e. Click **Next**, and then select **Allow the connection**.
f. Click **Next** again and select the appropriate network types (Domain, Private, or Public).
g. Give the rule a name (e.g., "Flask App - Port 5000") and click **Finish**.

After completing these steps, your Flask app should be accessible from other devices on the same network by visiting your IP address at port 5000 (e.g., `http://<your-ip>:5000`).

### Troubleshooting

- **If the app doesn't run properly**: Ensure that the correct version of Python is installed and all dependencies are installed using `pip install flask`.
- **If the app is not accessible from other devices**: Make sure to update your firewall rules as described above.

## License

This project is licensed under the MIT License. You can freely use and modify the code.


### License Conditions:
- You may freely modify, distribute, and use the code for personal use only.
- If you modify or distribute the code, you must include a reference to this original version of the code and acknowledge the author: Mehdi Adibi.
- Please ensure to provide attribution by citing the original version in any public use or modification of the code.

