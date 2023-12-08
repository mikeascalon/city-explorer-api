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

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_votes = movieData.vote_average;
    this.total_votes = movieData.vote_count;
    this.image_url = movieData.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
      : null;
    this.popularity = movieData.popularity;
    this.released_on = movieData.release_date;
  }
}


// Define a route for the root endpoint
app.get('/weather', async (req, res) => {
  res.json([]); // need to delete after today dec7 pass the limit for today
  return

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

// Define a route for the root endpoint

app.get('/movies', async (req, res) => {
  const { searchQuery, lat, lon } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=ab976a9320b73b5f43bc4733611a1c13`;

  try {
    const movieResponse = await axios.get(url);
    const formattedMovies = movieResponse.data.results.map(eachMovie => {
      return new Movie(eachMovie);
    });

    console.log(formattedMovies);
    res.json(formattedMovies);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).send('Internal Server Error');
  }
});



// Start the server and listen on the specified port
app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
