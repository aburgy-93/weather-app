import * as model from "./model";
import searchView from "./views/searchView.js";
import weatherView from "./views/weatherView";

const controlSearchResults = async function () {
  try {
    // 1) Get search query from searchView
    const query = searchView.getQuery();
    if (!query) return;
    console.log(query);

    // 2) Load search results
    await model.loadSearchResults(query);
    // 3) Render results
  } catch (err) {
    console.log(err);
  }
};

const controlWeather = async function () {
  try {
    weatherView.render(model.state);
  } catch (err) {
    weatherView.renderError();
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  weatherView.addHandlerRender(controlWeather);
};

init();
