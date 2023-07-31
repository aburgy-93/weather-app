("use strict");

import View from "./View";

class WeatherView extends View {
  _parentElement = document.querySelector(".weather-div");

  toggle() {
    this._parentElement.classList.toggle("hidden");
  }

  _generateMarkup() {
    return `
    <img src="${this._data.condition.conditionIcon}" class="weather-icon"> 
    <div class="weaither-info">
      <ion-icon name="accessibility-outline"></ion-icon> 
      <div class="location">
      <h1 class="location-heading">${this._data.location.name}, ${
      this._data.location.region
    }</h1>
      </div>
      <h2 class="weather-description">${this._data.current.currWeather}</h2>
      <h2 class="temp">${this._data.current.currTempF}<span>&#8457;</span></h2>
    </div>

    <div class="details">
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
    </div> 
    
    <div class="hourly-container">
      <div class="title">
        <img class="svg"  src="img/images/time-outline.svg" alt="">
        <p class="hourly-title">Hourly Forecast</p>
      </div>
      <ul class="hourly">
         ${this._data.hourlyForcast.map(this._generateHourlyMarkup).join("")}
      </ul>
    </div>
    
    <div class="forecast">
      <div class="title">
        <img class="svg" src="img/images/calendar-outline.svg" alt="">
        <p class="forecast-title">3-day Forecast</p>
      </div>
      <div class="forecast-container">
        ${this._data.forecastResults.map(this._generateForecastMarkup).join("")}
      </div>
    </div>
  `;
  }

  _generateHourlyMarkup(data) {
    return `
        <li class="preview">
          <p class="hour">${data.time}</p>
          <img src="${data.condition}" alt="" class="hourImg">
          <p class="hourlyTemp">${data.temp}<span>&#8457;</span></p>
        </li>
      `;
  }

  _generateForecastMarkup(day) {
    return `
            <div class="day day-">
              <p>${day.date}</p>
              <img src="${day.dayIcon}" alt="">
              <p>${Math.trunc(day.hightemp_f)}<span>&#8457;</span></p>
              <p>${Math.trunc(day.lowtemp_f)}<span>&#8457;</span></p>
            </div>
          `;
  }
}

export default new WeatherView();
