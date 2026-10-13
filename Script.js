const API_KEY = "YOUR_API_KEY";

async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("weather-result");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name!</p>";
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
        result.innerHTML = "<p>Please add your weather API key in script.js.</p>";
        return;
    }

    result.innerHTML = "<p>Loading weather...</p>";

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather.");
        }

        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const condition = data.weather[0].description;
        const icon = data.weather[0].icon;

        result.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>

            <img
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${condition}">

            <h2>${temperature} °C</h2>

            <p>Condition: ${condition}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${wind} m/s</p>
        `;

    } catch (error) {
        result.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}