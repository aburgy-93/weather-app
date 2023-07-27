("use strict");

import View from "./View";

class WeatherView extends View {
  _parentElement = document.querySelector(".weather-div");
  // weatherInfo = document.querySelector(".weaither-info");
  // weatherDetails = document.querySelector(".details");
  // forecastContainer = document.querySelector(".forecast-container");
  // hourContainer = document.querySelector(".hourly");

  toggle() {
    this._parentElement.classList.toggle("hidden");
  }

  _generateMarkup() {
    return `
    
      <img src="${this._data.condition.conditionIcon}" class="weather-icon">
      <h1 class="location-heading">${this._data.location.name}, ${this._data.location.region}</h1>
      <h2 class="weather-description">${this._data.current.currWeather}</h2>
      <h2 class="temp">${this._data.current.currTempF}<span>&#8457;</span></h2>
    `;
  }
}

export default new WeatherView();
