const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const getWeather = require('./lib/weather');
const getMovies = require('./lib/movies');


const port = process.env.PORT || 3000;

// middleware
app.use(cors());

app.get('/weather', getWeather);

app.get('/movies', getMovies);



// Start the server and listen on the specified port
app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});
