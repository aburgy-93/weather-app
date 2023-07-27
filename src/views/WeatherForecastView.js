"use strict";
import View from "./View";

class ForcastView extends View {
  _parentElement = document.querySelector(".forecast-container");

  _generateMarkup() {
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
}

export default new ForcastView();
