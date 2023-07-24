// Wait until the DOM has loaded
document.addEventListener('DOMContentLoaded', function () {

    //Get the values of the convert button and currency container using its id
    var getConvertButton = document.getElementById('getConvertButton');
    var getCurrencyContainer = document.getElementById('currencyContainer');
  
    // Add an event listener that waits for the covert button to be clicked
    getConvertButton.addEventListener('click', function () {
      getConversion(); // Call the getConversion method
    });
  
    // Create a getConversion method
    function getConversion() {
        var apiKey = 'W71gFsBQQReruydK4ipfOg==QscIYLyAN1gDsBJg'; // Replace with your API Ninjas API key
        var currencyHaveValue = document.getElementById('currencyHave').value; // Get the currency have value
        var currencyWantValue = document.getElementById('currencyWant').value; // Get the currency want value
        var getAmount = document.getElementById('amount').value; // Get the amount
      
        var apiUrl = `https://api.api-ninjas.com/v1/convertcurrency?want=${currencyWantValue}&have=${currencyHaveValue}&amount=${getAmount}`; // Change the url by inputting the variables inside for want, have and amount 
      
        // Make the API request
        fetch(apiUrl, {
          method: 'GET',
          headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json', // Add the content type header
          },
        })
          // If the response is successful (status 200), it returns the JSON data from the response.
        .then((response) => {
            // Check if the response status is not OK
            if (!response.ok) {
            // Throw an error with the message 'Network response was not ok'
            throw new Error('Network response was not ok');
            }           
            // If the response status is OK, parse the response as JSON and return it
            return response.json();
        })

          .then((data) => {

            // Check if the API response has a valid result
            if (data.hasOwnProperty('new_amount')) 
            {
              var convertedValue = data.new_amount;

              // Display the converted value in the currency container
              getCurrencyContainer.innerText = `${getAmount} ${currencyHaveValue.toUpperCase()} = ${convertedValue} ${currencyWantValue.toUpperCase()}`;
            } 

            // Else there was an error
            else 
            {
              throw new Error('Invalid response data');
            }
          })

          .catch((error) => {
            // Handle errors if the API request fails or has invalid data
            console.error('Error fetching data:', error);
            getCurrencyContainer.innerText = 'Error fetching data';
          });
      }
      
  });
  