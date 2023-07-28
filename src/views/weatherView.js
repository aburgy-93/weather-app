("use strict");

import View from "./View";

class WeatherView extends View {
  _parentElement = document.querySelector(".weather-div");

  toggle() {
    this._parentElement.classList.toggle("hidden");
  }

  _generateMarkup() {
    // return `
    //   <img src="${this._data.condition.conditionIcon}" class="weather-icon">
    //   <h1 class="location-heading">${this._data.location.name}, ${this._data.location.region}</h1>
    //   <h2 class="weather-description">${this._data.current.currWeather}</h2>
    //   <h2 class="temp">${this._data.current.currTempF}<span>&#8457;</span></h2>
    // `;
    return `
    <img src="${this._data.condition.conditionIcon}" class="weather-icon"> 
    <div class="weaither-info">
      <ion-icon name="accessibility-outline"></ion-icon> 
      <div class="location">
      <h1 class="location-heading">${this._data.location.name}, ${this._data.location.region}</h1>
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
        <li class="preview">
          <p class="hour">13</p>
          <img src="img/images/humidity.png" alt="" class="hourImg">
          <p class="hourlyTemp">74<span>&#8457;</span></p>
        </li>
        
        <li class="preview">
          <p class="hour">24</p>
          <img  src="img/images/humidity.png" alt="" class="hourImg">
          <p class="hourlyTemp">74<span>&#8457;</span></p>
        </li> 
      </ul>
    </div>
    
    <div class="forecast">
      <div class="title">
        <img class="svg" src="img/images/calendar-outline.svg" alt="">
        <p class="forecast-title">3-day Forecast</p>
      </div>
      <div class="forecast-container">
        <div class="day day-1">
          <p>Mon</p>
          <img src="img/images/clouds.png" alt="">
          <p>50<span>&#8457;</span></p>
          <p>50<span>&#8457;</span></p>
        </div>
        <div class="day day-2">
          <p>Tues</p>
          <img src="img/images/clouds.png" alt="">
          <p>60<span>&#8457;</span></p>
          <p>60<span>&#8457;</span></p>
        </div>
        <div class="day day-3">
          <p>Wed</p>
          <img src="img/images/clouds.png" alt="">
          <p>69<span>&#8457;</span></p>
          <p>69<span>&#8457;</span></p>
        </div> 
      </div>
    </div>
  `;
  }
}

export default new WeatherView();
