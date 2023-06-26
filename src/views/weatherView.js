("use strict");

import * as model from "../model";
import searchView from "./searchView";

class WeatherView {
  weatherDiv = document.querySelector(".weather-div");
  weatherInfo = document.querySelector(".weaither-info");
  weatherDetails = document.querySelector(".details");
  forecastContainer = document.querySelector(".forecast-container");
  hourContainer = document.querySelector(".hourly");

  _errorMessage = "Could not find that location. Please try another one!";

  render = function (data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markupCurrWeather = this._generateCurrentWeatherMarkup();
    const markupCurrWeatherDetails = this._generateCurrWeatherDetailsMarkup();
    const markupForecast = this._generateForecastMarkup();
    const hourlyMarkup = this._generateHourlyForecast();

    this.weatherInfo.textContent = "";
    this.weatherDetails.textContent = "";
    this.weatherDiv.classList.toggle("hidden");
    this.forecastContainer.textContent = "";
    this.hourContainer.textContent = "";
    this.weatherInfo.insertAdjacentHTML("afterbegin", markupCurrWeather);
    this.weatherDetails.insertAdjacentHTML(
      "afterbegin",
      markupCurrWeatherDetails
    );
    this.forecastContainer.insertAdjacentHTML("afterbegin", markupForecast);
    this.hourContainer.insertAdjacentHTML("afterbegin", hourlyMarkup);
  };

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

  _generateCurrentWeatherMarkup() {
    return `
    <div class="weaither-info">
      <img src="${this._data.condition.conditionIcon}" class="weather-icon">
      <h1 class="location-heading">${this._data.location.name}, ${this._data.location.region}</h1>
      <h2 class="weather-description">${this._data.current.currWeather}</h2>
      <h2 class="temp">${this._data.current.currTempF}<span>&#8457;</span></h2>
    </div>
    `;
  }

  _generateCurrWeatherDetailsMarkup() {
    return `
      <div class="col left">
        <img src="/humidity.5ee5b96c.png" alt="">
        <div class="condition-div">
          <div class="condition percent">
            <p class="humidity">${this._data.current.humidity}%</p>
          </div>
          <p>Humidity</p>
        </div>
      </div>
      <div class="col">
        <img src="/wind.b8bb298f.png" alt="">
        <div class="condition-div">
          <div class="condition speed">
            <p class="wind">${this._data.current.windSpeed}</p><span>mph</span>
          </div>
          <p class="wind-speed">Wind Speed</p>
        </div>
      </div>
    `;
  }

  _generateForecastMarkup() {
    return this._data.forecastResults
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
  }

  _generateHourlyForecast() {
    return this._data.hourlyForcast
      .map((data) => {
        return `
        <li class="preview">
          <p class="hour">${data.time}</p>
          <img src="${data.condition}" alt="" class="hourImg">
          <p class="hourlyTemp">${data.temp}<span>&#8457;</span></p>
        </li>
      `;
      })
      .join("");
  }
}

export default new WeatherView();
