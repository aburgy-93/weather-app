class ForcastView {
  _parentElement = document.querySelector(".forecast-container");

  _generateForecastMarkup() {
    return this._data
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
