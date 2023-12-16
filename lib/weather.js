const axios = require('axios');
const db = require('../db.js');


console.log('db', db);

// Define a route for the root endpoint
async function getWeather(req, res) {

  // http://localhost:3001/weather?searchQuery=Seattle
  const { lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_ACCESS_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;

  const cacheKey = `${lat}:${lon}`;

  if (db[cacheKey] === undefined) {

    try {
      console.log('fetching from API');
      const weatherResponse = await axios.get(url);

      let formattedForecast = weatherResponse.data.data.map((eachWeatherDay) => {
        return new Forecast(eachWeatherDay);
      });

      // Update the cache with the formatted forecast
      db[cacheKey] = formattedForecast;

      res.json(formattedForecast);

    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).send('Internal Server Error');
    }

  } else {

    console.log('fetching from DB')
    res.status(200).send(db[cacheKey]);
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
