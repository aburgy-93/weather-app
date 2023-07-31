- Still need to seperate the different views and their functionality.
  -each view is now in their own module
  -clear() in View.js does not allow for other modules to be inserted to their proper place. Next fix.

- Currently everything runs in weatherView.js rather than it's own module.
- Need to set the View.js module to be able to render modules universally.
- weatherView will display the current weather
- forecastView will display the 3-day forecast
- hourlyView will display the 24hr forecast
