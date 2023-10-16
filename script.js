// Function to store the searched cities in local storage
function storeSearch(city) {
    // Retrieve the existing search history or create an empty array
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Add the new city to the search history
    searchHistory.push(city);

    // Save the updated search history back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Add an event listener to the search button
document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = '3db36d1083cc4e96d3551a27be136d5b';

    // Store the searched city in the search history
    storeSearch(city);

    // Your existing code for fetching and displaying weather data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = '3db36d1083cc4e96d3551a27be136d5b';

    // Adjust the API URL to fetch the 5-day forecast data
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function displayWeather(data) {
    // Display city name
    document.getElementById('day1-city-name').textContent = data.city.name;

    // Loop through the 5-day forecast data
    for (let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8]; // Get data for every 8th entry (represents one day)

        // Display temperature in Celsius
        const temperatureCelsius = (dayData.main.temp - 273.15).toFixed(2);
        document.getElementById(`day${i + 1}-temperature`).textContent = temperatureCelsius + "°C";

        // Display humidity
        document.getElementById(`day${i + 1}-humidity`).textContent = dayData.main.humidity + "%";

        // Display wind speed
        document.getElementById(`day${i + 1}-wind-speed`).textContent = dayData.wind.speed + " km/h";

        
    }
}
