function updateWeatherData(response) {
    console.log(response.data); 
    let cityElement = document.querySelector("#city");
    let weatherDetailsElement = document.querySelector(".weather-app-details");
    let temperatureElement = document.querySelector(".weather-app-temperature");
    let weatherIconElement = document.querySelector(".weather-app-icon");

    cityElement.innerHTML = response.data.city;
    weatherDetailsElement.innerHTML = `${response.data.condition.description}, Humidity: <strong>${response.data.temperature.humidity}%</strong>, Wind: <strong>${response.data.wind.speed} km/h</strong>`;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    weatherIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" />`;
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
    let apiKey = "307c2540doab8f13b37004f7fdft20c1";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(updateWeatherData);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
