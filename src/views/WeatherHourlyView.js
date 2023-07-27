"use strict";

import View from "./View";

class WeatherHourly extends View {
  _parentElement = document.querySelector(".hourly");

  _generateMarkup() {
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

export default new WeatherHourly();
