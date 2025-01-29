// *******************************************************
// Script Name: scripts.js
// Author: Mehdi Adibi (Neurodigit Lab)
// Version: 1.0
// Date Created: January, 2025
// Last Modified: -
// Description: Javascript functions for the front-end.
// *******************************************************



// Wait for the document to be fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Get the save stats button element by its ID
    const saveStatsButton = document.getElementById("saveStats");

    // Make sure the button exists before attaching the event listener
    if (saveStatsButton) {
        // Attach the click event listener to the save stats button
        saveStatsButton.addEventListener("click", saveStats);
    }
});

/**
 * Fetches the latest response data from the server and updates the statistics displayed on the page.
 * 
 * This function makes a GET request to the `/responses` endpoint to fetch the current responses data.
 * It calculates the total number of responses, updates the displayed responses for each option, and 
 * calculates the percentage of responses for each option.
 * Additionally, it updates the total number of participants and client count shown on the page.
 * 
 * The function is executed every 2 seconds to keep the statistics up-to-date in real-time.
 */
function fetchResponses() {
    fetch('/responses')
        .then(response => response.json())
        .then(data => {
            // Update response stats
            const statsList = document.getElementById('statList');
            statsList.innerHTML = '';
			
			const totalResponses = Object.values(data.responses).reduce((sum, count) => sum + count, 0);
			const totalRespElement = document.getElementById('total_responses');
			totalRespElement.textContent = totalResponses;
			
            for (const [option, count] of Object.entries(data.responses)) {
                const listItem = document.createElement('li');
				const percentage = totalResponses > 0 ? ((count / totalResponses) * 100).toFixed(0) : 0; // Calculate percentage
                listItem.textContent = `${option}: ${count} responses (${percentage}%)`;
                statsList.appendChild(listItem);
            }

            // Update client count
            const clientCountElement = document.getElementById('client-count');
            clientCountElement.textContent = data.client_count;
        })
        .catch(error => console.error('Error fetching responses:', error));
        }
		

// Call fetchResponses every 2 seconds to update the response stats in real-time
setInterval(fetchResponses, 2000);



/* old version of saveStat
document.getElementById("saveStats").addEventListener("click", () => {
	alert(document.getElementById("saveStats"))
    const stats = [];
    const totalResponses = document.getElementById("total_responses").textContent;
    const totalParticipants = document.getElementById("client-count").textContent;
    const statListItems = document.querySelectorAll("#statList li");

    // Collect stats from the list
    statListItems.forEach(item => {
        stats.push(item.textContent);
    });

    // Prepare JSON object
    const dataToSave = {
        totalResponses: totalResponses,
        totalParticipants: totalParticipants,
        stats: stats,
    };

    // Convert JSON object to a Blob
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: "application/json" });

    // Create a download link and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stats.json"; // Set the filename
    link.click();

    // Clean up the object URL
    
}); */


/**
 * Saves the current statistics (responses and client count) as a JSON file.
 * 
 * This function collects the statistics data from the current page, including:
 * - The total number of responses for each option.
 * - The total number of responses and the corresponding percentages.
 * - The client count.
 * 
 * It then creates a Blob object containing this data in JSON format, which is then used
 * to create a downloadable link (anchor element) for the user to save the data as a `.json` file.
 * The file is named 'liveclass_stats.json' and contains the current session's stats in a human-readable format.
 * 
 * The function is triggered when the "Save Stats" button is clicked.
 */
function saveStats() {
    const responses = {}; // Store the responses data
    const statsList = document.getElementById('statList').children;

    // Loop through the list items and store each option's responses and percentage
    for (let i = 0; i < statsList.length; i++) {
        const listItem = statsList[i].textContent;
        const option = listItem.split(':')[0].trim();
        const count = parseInt(listItem.split(':')[1].split(' ')[1]);
        const percentage = parseFloat(listItem.split('(')[1].split('%')[0].trim());

        // Store data in responses object
        responses[option] = { count: count, percentage: percentage };
    }

    const totalResponses = document.getElementById('total_responses').textContent;
    const clientCount = document.getElementById('client-count').textContent;

    // Construct the data object to save
    const statsData = {
        totalResponses: totalResponses,
        clientCount: clientCount,
        responses: responses
    };

    // Create a Blob object containing the stats data as a JSON string
    const blob = new Blob([JSON.stringify(statsData, null, 2)], { type: 'application/json' });

    // Create a download link for the Blob object
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'liveclass_stats.json'; // Specify file name

    // Trigger the download by simulating a click on the link
    link.click();
	URL.revokeObjectURL(link.href);
	
	console.log('Stats saved!');
}

