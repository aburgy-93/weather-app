export const state = {
  query: "",
  location: {},
  current: {},
  condition: {},
  forecastResults: [],
  hourlyForcast: [],
};

export const loadSearchResults = async function (query) {
  if (!query) return;
  state.query = query;
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=0d3f35d4d5b94baba11203207230604&q&q=${query}&hour&days=3&aqi=no&alerts=no`
  );
  const data = await response.json();
  console.log(data);
  createWeatherObject(data);
};

const createWeatherObject = function (data) {
  const { current } = data;
  const { condition } = data.current;
  const { forecastday } = data.forecast;
  const { location } = data;

  state.current = {
    currTempF: current.temp_f,
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
  createHourlyForecastObject(forecastday);
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
      hourForecast: data.hour,
    };
  });
};

const createHourlyForecastObject = function (data) {
  state.hourlyForcast = data[0].hour.map((data) => {
    return {
      time: data.time.slice(11),
      condition: data.condition.icon,
      temp: data.temp_f,
    };
  });
  console.log(state.hourlyForcast);
};
