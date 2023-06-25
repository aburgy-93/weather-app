("use strict");

import * as model from "../model";
import searchView from "./searchView";

class WeatherView {
  weatherDiv = document.querySelector(".weather-div");
  weatherInfo = document.querySelector(".weaither-info");
  weatherDetails = document.querySelector(".details");
  forecastContainer = document.querySelector(".forecast-container");

  _errorMessage = "Could not find that location. Please try another one!";

  addHandlerRender(handler) {}

  render = function () {};

  renderError = function (msg = _errorMessage) {
    markup = `
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

  _generateWeatherMarkup = async function (local) {
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
      _generateForecastMarkup();
    } catch (err) {
      // throw new Error(renderError(err));
      // throw renderError(err);
      renderError();
    }
  };

  _generateForecastMarkup = async function () {
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
}

export default new WeatherView();
