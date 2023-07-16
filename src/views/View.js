export default class View {
  _errorMessage = "Could not find that location. Please try another one!";

  // Refactoring needed
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markupCurrWeather = this._generateCurrentWeatherMarkup();
    const markupCurrWeatherDetails = this._generateCurrWeatherDetailsMarkup();
    const markupForecast = this._generateForecastMarkup();
    const hourlyMarkup = this._generateHourlyForecast();

    this.weatherInfo.textContent = "";
    this.weatherDetails.textContent = "";
    this.weatherDiv.classList.toggle("hidden");
    this.forecastContainer.textContent = "";
    this.hourContainer.textContent = "";
    this.weatherInfo.insertAdjacentHTML("afterbegin", markupCurrWeather);
    this.weatherDetails.insertAdjacentHTML(
      "afterbegin",
      markupCurrWeatherDetails
    );
    this.forecastContainer.insertAdjacentHTML("afterbegin", markupForecast);
    this.hourContainer.insertAdjacentHTML("afterbegin", hourlyMarkup);
  }

  renderError(msg = _errorMessage) {
    markup = `
      <div class="error">
        <div>
          <ion-icon name="warning"></ion-icon>
        </div>
        <p>${msg}</p>
      </div>
    `;
    weatherDiv.innerHTML = "";
    weatherDiv.insertAdjacentHTML("beforebegin", markup);
  }
}
