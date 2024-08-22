async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = "dee4f3f8fbfcba7dbda3ec7ed7213920";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found !');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const emoji = getWeatherEmoji(data.weather[0].main);
    const cityTime = getCityTime(data.timezone);
    const localTime = getLocalTime();
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        <div class="emoji">${emoji}</div>
        <div class="time">
            <p><strong>Local Time:</strong> ${localTime}</p>
            <p><strong>${data.name} Time:</strong> ${cityTime}</p>
        </div>
    `;
}
function getWeatherEmoji(weather) {
    switch (weather.toLowerCase()) {
        case 'clear':
            return '☀️';
        case 'clouds':
            return '☁️';
        case 'rain':
            return '🌧️';
        case 'drizzle':
            return '🌦️';
        case 'thunderstorm':
            return '⛈️';
        case 'snow':
            return '❄️';
        case 'mist':
        case 'fog':
            return '🌫️';
        default:
            return '🌈';
    }
}

function getLocalTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getCityTime(timezoneOffset) {
    const now = new Date();
    const cityTime = new Date(now.getTime() + timezoneOffset * 1000);
    return cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}