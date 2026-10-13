const apiKey = "YOUR_API_KEY_HERE"; // paste your key here

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const errorMsg = document.getElementById("errorMsg");
  const card = document.getElementById("weatherDisplay");

  if (!city) return;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("cityName").textContent =
      data.name + ", " + data.sys.country;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").textContent =
      Math.round(data.main.temp) + "°C";
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("feelsLike").textContent =
      Math.round(data.main.feels_like);

    card.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  } catch (error) {
    errorMsg.textContent = "❌ " + error.message;
    errorMsg.classList.remove("hidden");
    card.classList.add("hidden");
  }
}

// Search on Enter key
document.getElementById("cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});
