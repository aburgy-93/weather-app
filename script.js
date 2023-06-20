("use strict");

const textArea = document.querySelector("#textarea");
const btnSubmit = document.querySelector(".btn-submit");
const weatherDiv = document.querySelector(".weather-div");
const weatherInfo = document.querySelector(".weaither-info");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDetails = document.querySelector(".details");
const forecastContainer = document.querySelector(".forecast-container");

const state = {
  query: "",
  location: {},
  current: {},
  condition: {},
  forecastResults: [],
};

const renderError = function (msg) {
  const markup = `
    <div class="error">
    <p>ERROR</p>
      <div>
      <ion-icon name="warning"></ion-icon>
      </div>
    </div>
  `;
  weatherDiv.innerHTML = "";
  weatherDiv.insertAdjacentHTML("beforebegin", markup);
};

const getWeatherData = async function (local) {
  try {
    if (!local) return;
    state.query = local;
    const response = await fetch(
      // `http://api.weatherapi.com/v1/forecast.json?key=0d3f35d4d5b94baba11203207230604&q&q=${local}&days=3&aqi=no&alerts=no`
      `http://api.weatherapi.com/v1/forecast.json?key=0d3f35d4d5b94baba11203207230604&q&q=&days=3&aqi=no&alerts=no`
    );
    const data = await response.json();

    const { current } = data;
    const { condition } = data.current;
    const { forecastday } = data.forecast;
    const { location } = data;

    state.current = {
      currTempF: current.feelslike_f,
      currWeather: current.condition.text,
      humidity: current.humidity,
      windSpeed: current.wind_mph,
    };

    state.condition = {
      conditionIcon: condition.icon,
    };

    state.location = {
      name: location.name,
      region: location.region,
    };

    createForcastObject(forecastday);

    const markup = `
      <div class="weaither-info">
        <img src="${state.condition.conditionIcon}" class="weather-icon">
        <h1 class="location-heading">${state.location.name}, ${state.location.region}</h1>
        <h2 class="weather-description">${state.current.currWeather}</h2>
        <h2 class="temp">${state.current.currTempF}<span>&#8457;</span></h2>
      </div>
    `;
    weatherInfo.textContent = "";
    weatherInfo.insertAdjacentHTML("afterbegin", markup);

    const detailsMarkup = `
        <div class="col left">
        <img src="/humidity.5ee5b96c.png" alt="">
        <div class="condition-div">
          <div class="condition percent">
            <p class="humidity">${state.current.humidity}%</p>
          </div>
          <p>Humidity</p>
        </div>
      </div>
      <div class="col">
        <img src="/wind.b8bb298f.png" alt="">
        <div class="condition-div">
          <div class="condition speed">
            <p class="wind">${state.current.windSpeed}</p><span>mph</span>
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
    renderError(err);
  }
};

const createForcastObject = function (data) {
  state.forecastResults = data.map((data) => {
    const forecastDates = new Date(data.date);
    forecastDates.setDate(forecastDates.getDate() + 1);
    const dateFormat = {
      weekday: "short",
    };

    return {
      hightemp_f: data.day.maxtemp_f,
      lowtemp_f: data.day.mintemp_f,
      dayText: data.day.condition.text,
      dayIcon: data.day.condition.icon,
      date: forecastDates.toLocaleDateString("en-GB", dateFormat),
    };
  });
};

const loadDailyForecast = async function () {
  try {
    const data = state.forecastResults;
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

const formSubmit = function () {
  const textValue = textArea.value;
  if (!textValue) return;
  getWeatherData(textValue);
};

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  formSubmit();
  weatherDiv.style.display = "block";
  textArea.value = "";
});
