import * as model from "./model";
import searchView from "./views/searchView.js";
import weatherView from "./views/weatherView";
import weatherDetails from "./views/weatherDetails";
import WeatherHourlyView from "./views/WeatherHourlyView";
import WeatherForecastView from "./views/WeatherForecastView";

const controlSearchResults = async function () {
  try {
    // 1) Get search query from searchView
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    weatherView.toggle();
    weatherView.render(model.state);
    // weatherDetails.render(model.state);
    // WeatherHourlyView.render(model.state);
    // WeatherForecastView.render(model.state);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
};

init();
