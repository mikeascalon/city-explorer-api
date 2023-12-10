const axios = require('axios');
const cache = require('./cache.js');


// Define a route for the root endpoint
async function getWeather(req, res) {

  // http://localhost:3001/weather?searchQuery=Seattle
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_ACCESS_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  const weatherResponse = await axios.get(url);

  try {
    let formattedForecast = weatherResponse.data.data.map((eachWeatherDay) => {
      return new Forecast(eachWeatherDay);
    });

    res.json(formattedForecast);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Internal Server Error');
  }

}

class Forecast {
  constructor(day) {
    // console.log('one day: ', day);
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;
