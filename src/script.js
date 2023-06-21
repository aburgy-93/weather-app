("use strict");

import * as model from "./model";
import searchView from "./views/searchView";

const textArea = document.querySelector("#textarea");
const btnSubmit = document.querySelector(".btn-submit");
const weatherDiv = document.querySelector(".weather-div");
const weatherInfo = document.querySelector(".weaither-info");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetails = document.querySelector(".details");
const forecastContainer = document.querySelector(".forecast-container");

const _errorMessage = "Could not find that location. Please try another one!";

const renderError = function (msg = _errorMessage) {
  const markup = `
    <div class="error">
      <div>
        <ion-icon name="warning"></ion-icon>
      </div>
      <p>${msg}</p>
    </div>
  `;
  weatherDiv.innerHTML = "";
  weatherDiv.insertAdjacentHTML("beforebegin", markup);
};

const getWeatherData = async function (local) {
  try {
    const markup = `
      <div class="weaither-info">
        <img src="${model.state.condition.conditionIcon}" class="weather-icon">
        <h1 class="location-heading">${model.state.location.name}, ${model.state.location.region}</h1>
        <h2 class="weather-description">${model.state.current.currWeather}</h2>
        <h2 class="temp">${model.state.current.currTempF}<span>&#8457;</span></h2>
      </div>
    `;
    weatherInfo.textContent = "";
    weatherInfo.insertAdjacentHTML("afterbegin", markup);

    const detailsMarkup = `
        <div class="col left">
        <img src="/humidity.5ee5b96c.png" alt="">
        <div class="condition-div">
          <div class="condition percent">
            <p class="humidity">${model.state.current.humidity}%</p>
          </div>
          <p>Humidity</p>
        </div>
      </div>
      <div class="col">
        <img src="/wind.b8bb298f.png" alt="">
        <div class="condition-div">
          <div class="condition speed">
            <p class="wind">${model.state.current.windSpeed}</p><span>mph</span>
          </div>
          <p class="wind-speed">Wind Speed</p>
        </div>
      </div>
    `;
    weatherDetails.textContent = "";
    weatherDetails.insertAdjacentHTML("afterbegin", detailsMarkup);
    loadDailyForecast();
  } catch (err) {
    // throw new Error(renderError(err));
    // throw renderError(err);
    renderError();
  }
};

const loadDailyForecast = async function () {
  try {
    const data = model.state.forecastResults;
    if (!data) return;
    const markup = data
      .map((day) => {
        return `
            <div class="day day-">
              <p>${day.date}</p>
              <img src="${day.dayIcon}" alt="">
              <p>${Math.trunc(day.hightemp_f)}<span>&#8457;</span></p>
              <p>${Math.trunc(day.lowtemp_f)}<span>&#8457;</span></p>
            </div>
          `;
      })
      .join("");

    forecastContainer.textContent = "";
    forecastContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.log(err);
    throw new Error(`Country not found (${err.message})`);
  }
};

// const formSubmit = function () {
//   const textValue = textArea.value;
//   if (!textValue) return;
//   getWeatherData(textValue);
// };

// btnSubmit.addEventListener("click", function (e) {
//   e.preventDefault();
//   formSubmit();
//   weatherDiv.style.display = "block";
//   textArea.value = "";
// });
