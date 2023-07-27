"use strict";

import View from "./View";
class WeatherDetails extends View {
  _parentElement = document.querySelector(".details");

  _generateMarkup() {
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
}

export default new WeatherDetails();
