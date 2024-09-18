function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(new Date(response.data.time * 1000));
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" alt="${response.data.condition.description}" />`;

  
  getForecast(response.data.city); 

  localStorage.setItem("weatherData", JSON.stringify(response.data));
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function getWeatherIcon(iconCode) {
  const iconMap = {
    "clear-sky-day": "☀️",
    "clear-sky-night": "🌕",
    "few-clouds-day": "🌤️",
    "few-clouds-night": "🌥️",
    "clouds-night": "☁️",
    "clouds-rain": "🌧️",
  };
  return iconMap[iconCode] || "❓";
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastData = response.data.daily.slice(1,6);
  let forecastHTML = "";

  forecastData.forEach(function(day) {
    let date = new Date(day.time * 1000).toLocaleDateString('en-US', { weekday: 'short' });

    let maxTemp = Math.round(day.temperature.maximum);
    let minTemp = Math.round(day.temperature.minimum);

    forecastHTML += `
    <div class="weather-forecast">
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${date}</div>
        <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" alt="${day.condition.description}">
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature"><strong>${maxTemp}°</strong></div>
          <div class="weather-forecast-temperature">${minTemp}°</div>
        </div>
      </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  searchCity("Pretoria");
});

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
