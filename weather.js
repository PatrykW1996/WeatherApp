const userInput = document.querySelector(".user-input");
const searchButton = document.querySelector(".search-button");
const weatherContainer = document.querySelector(".weather-container");
const weatherClass = document.querySelector(".weather");
const alertMessage = document.querySelector(".alert-message");

let isShowingWeather = false;

function searchForWeather() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${userInput.value.trim()}&appid=084b05b7f88e24ee3c1613de462d8d8e`;
  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${userInput.value.trim()}&appid=084b05b7f88e24ee3c1613de462d8d8e`;

  weatherInfo(apiUrl);

  userInput.value = "";
}
searchButton.addEventListener("click", searchForWeather);

function displayAlert(message) {
  alertMessage.textContent = message;
  alertMessage.style.fontWeight = "bold";
  setTimeout(() => (alertMessage.textContent = ""), 1500);
}

async function weatherInfo(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const html = `
        <div class = 'weather-info'>
          <div class="weather">
            <img src="./icons/${data.weather[0].main}.svg" />
            <div class="description">
              <p class="temperature">${Math.round(data.main.temp)}°C</p>
              <p class="city-name">${data.name}</p>
            </div>
          </div>
          <div class="details">
            <div class="wind">
              <img src="./icons/wind.svg" />
              <p>${Math.round(data.wind.speed)} km/h</p>
              <p>Wind speed</p>
            </div>
            <div class="humidity">
              <img src="./icons/humidity.svg" />
              <p>${data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
    `;
    if (isShowingWeather) {
      weatherContainer.removeChild(document.querySelector(".weather-info"));
      isShowingWeather = false;
    }
    if (!isShowingWeather) {
      weatherContainer.insertAdjacentHTML("beforeend", html);
      isShowingWeather = true;
    }
  } catch (err) {
    displayAlert(`Please check your spelling`);
  }
}
