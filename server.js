const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
// const weatherData = require('./weather.json');
const axios = require('axios');



const port = process.env.PORT || 3000;

// middleware
app.use(cors());



class Forecast {
  constructor(day) {
    // console.log('one day: ', day);
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


// Define a route for the root endpoint
app.get('/weather', async (req, res) => {
  console.log('we made it to the / weather route  ')
  // http://localhost:3001/weather?searchQuery=Seattle

  const { searchQuery, lat, lon } = req.query;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_ACCESS_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`

  const weatherResponse = await axios.get(url);
  // console.log(weatherResponse.data);

  try {
    // let matchingCityWeather = weatherData.find(weatherDay => weatherDay.city_name === searchQuery);


    let formattedForecast = weatherResponse.data.data.map(eachWeatherDay => {
      return new Forecast(eachWeatherDay);

    }
    );
    console.log(formattedForecast);
    res.json(formattedForecast);

  } catch {
    res.send('No matching city')
  }


}
);



// Start the server and listen on the specified port
app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
