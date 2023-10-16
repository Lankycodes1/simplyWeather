// Stor the searched cities in local storage
function storeSearch(city) {

    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];


    searchHistory.push(city);

    // Save the updated search history back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}


document.getElementById('search-button').addEventListener('click', function () {
    const city = document.getElementById('city-input').value;
    const apiKey = '3db36d1083cc4e96d3551a27be136d5b';

    storeSearch(city);

    // fetching and displaying weather data
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

    for (let i = 0; i < 5; i++) {
        const dayData = data.list[i * 8]; 

        // Display temperature in Celsius //
        const temperatureCelsius = (dayData.main.temp - 273.15).toFixed(2);
        document.getElementById(`day${i + 1}-temperature`).textContent = temperatureCelsius + "°C";

        // Display humidity //
        document.getElementById(`day${i + 1}-humidity`).textContent = dayData.main.humidity + "%";

        // Display wind speed //
        document.getElementById(`day${i + 1}-wind-speed`).textContent = dayData.wind.speed + " km/h";

        
    }
}
