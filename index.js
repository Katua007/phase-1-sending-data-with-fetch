// Add your code here
// Ensure window.fetch is available for browser-like environments if not already
// (though the test sets window.fetch, it's good practice for standalone code)
// window.fetch = window.fetch || require('node-fetch'); // Uncomment if running outside of test environment that provides node-fetch

// You might have other global functions or variables here from previous labs,
// like renderBooks or newHeader. For this lab, only submitData is required.

/**
 * Sends user data (name and email) to a server via a POST request.
 * Handles success by appending the new user ID to the DOM.
 * Handles errors by appending the error message to the DOM.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @returns {Promise<any>} A Promise representing the fetch operation.
 */
function submitData(name, email) {
  // Define the data to be sent in the request body
  const formData = {
    name: name,
    email: email,
  };

  // Define the configuration object for the fetch request
  const configurationObject = {
    method: "POST", // Specify the HTTP method as POST
    headers: {
      "Content-Type": "application/json", // Inform the server that we are sending JSON
      "Accept": "application/json",       // Inform the server that we accept JSON in return
    },
    body: JSON.stringify(formData), // Convert the JavaScript object to a JSON string
  };

  // Perform the fetch request and chain promises
  return fetch("http://localhost:3000/users", configurationObject)
    .then(response => {
      // Check if the response was successful (status code 2xx)
      if (!response.ok) {
        throw new Error('Something went wrong on the server.');
      }
      return response.json(); // Parse the JSON response body
    })
    .then(data => {
      // Test 2: Handle the successful response and append the new ID to the DOM
      document.body.innerHTML = data.id;
      return data; // Return data for further chaining if needed by tests
    })
    .catch(error => {
      // Test 3: Handle errors and append the error message to the DOM
      document.body.innerHTML = error.message;
      return error; // Return error instead of re-throwing
    });
}

// Make submitData globally accessible for the test environment.
// If your setup implicitly makes it global, you might not strictly need this,
// but it's safe to include for browser-like environments.
window.submitData = submitData;