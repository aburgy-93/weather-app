export default class View {
  _errorMessage = "Could not find that location. Please try another one!";
  _data;

  // Refactoring needed
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  // _clear() {
  //   this._parentElement.innerHTML = "";
  // }

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
