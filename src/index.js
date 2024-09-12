function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let iconElement = document.querySelector("#icon");
  let windspeedElement = document.querySelector("#wind-speed");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
  windspeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
  descriptionElement.innerHTML = `${response.data.condition.description}`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "93cfa66792bd1485a0bof13abdb33bft";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "93cfa66792bd1485a0bof13abdb33bft";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    console.log(response.data);
    forecastHtml =
      forecastHtml +
      `
 <div class="weather-forecast-day">
            <div class="weather-forcast-date">${day}</div>
            <div class="weather-forecast-icon">☀️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forcast-temperature">
                <strong>15°</strong>
              </div>
              <div class="weather-forcast-temperature">9°</div>
            </div>
          </div>



`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
