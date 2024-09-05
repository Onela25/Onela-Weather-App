function updateWeatherData(response) {
 console.log(response.data); 
}

function searchCity(city) {
let apiKey = "307c2540doab8f13b37004f7fdft20c1";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiURL).then(updateWeatherData);
}



function handleSearchSubmit( event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML =searchInput.value;
    searchCity (searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)