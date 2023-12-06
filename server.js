const express = require('express');
const dotenv = require('dotenv');
const app = express();
const weatherData = require('./weather.json');

dotenv.config();

const port = process.env.PORT || 3000;

// class Forecast {
//   constructor(type = 'city') {
//     if (typeof type !== 'string') throw new Error('List type error');
//     let { city_name, items } = weatherData.lists.find(list => list.city_name === type) || {city_name: null, items: []};
//     this.type = city_name;
//     this.itemValues = items;
//   }
//   getCity() {
//     return this.itemValues.map(item => ({
//       name: item.name,
//       latitude: item.latitude,
//       longitude: item.longitude
//     }));
//   }
// }


class Forecast {
  constructor(day) {
    // console.log('one day: ', day);
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


// Define a route for the root endpoint
app.get('/weather', (req, res) => {

  const { searchQuery, lat, lon } = req.query;
  try {
  let matchingCityWeather = weatherData.find(weatherDay => weatherDay.lat === lat);

  let formattedForecast = matchingCityWeather.data.map(eachWeatherDay => {
    return new Forecast(eachWeatherDay);
  }
  );
  res.json(formattedForecast);
  
  } catch {
    res.send('No matching city')
  }







}
);



//   const cityForecast = new forecast(searchQuery);

//   const cityInfo = {
//     city: cityList.type,
//     items: cityList.getCity()
//   };


//   // Assuming a simple response format for demonstration purposes
//   const response = {
//     latitude: parseFloat(lat),
//     longitude: parseFloat(lon),
//     searchQuery: searchQuery,
//     weather: {
//       city: weatherData.city,
//       latitude: weatherData.latitude,
//       longitude: weatherData.longitude
//     }
//   };

//   res.json(response);
// });



// Start the server and listen on the specified port
app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
