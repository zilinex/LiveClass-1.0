// *******************************************************
// Script Name: client.js
// Author: Mehdi Adibi (Neurodigit Lab)
// Version: 1.0
// Date Created: January, 2025
// Last Modified: -
// Description: Javascript functions for the front-end used in client.html.
// *******************************************************

/**
 * Function to handle answer submission.
 * This function is called when a user clicks on an answer button in the client.html.
 * It sends the chosen answer to the server and handles the response.
 * 
 * @param {string} option - The selected answer option.
 */
 
         function submitAnswer(option) {
            // Send the selected option to the server via fetch
            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ choice: option })  // Send the chosen answer
            })
            .then(response => response.json())
            .then(data => {
                console.log('Response received:', data);
                // You could add visual feedback here, like disabling buttons or highlighting the chosen one
                document.querySelectorAll('button').forEach(btn => {
                    btn.disabled = true;  // Disable all buttons after a choice
                });
                document.getElementById('btn-' + option).classList.add('selected');
				// document.getElementById('btn-' + option).style.backgroundColor = 'lightgreen';  // Highlight the selected button
            })
            .catch(error => console.error('Error:', error));
        }