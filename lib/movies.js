const axios = require('axios');
const db = require('../db.js');

// Define a route for the root endpoint
async function getMovies(req, res) {

  const { searchQuery } = req.query;

  const cacheKey = searchQuery.toLowerCase().replace(/\s/g, '_');



  if (db[cacheKey] === undefined || isCacheExpired(db[cacheKey]['timestamp'])) {

    try {

      const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIES_ACCESS_KEY}`;

      const movieResponse = await axios.get(url);
      const formattedMovies = movieResponse.data.results.map(eachMovie => {
        return new Movie(eachMovie);
      });

      // Update the cache with the formatted movies and timestamp
      db[cacheKey] = {
        data: formattedMovies,
        timestamp: Date.now(),
      };

      console.log(formattedMovies);
      res.json(formattedMovies);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.json(db[cacheKey]);
  }
}

function isCacheExpired(timestamp) {
  const cacheLifespan = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
  return Date.now() - timestamp > cacheLifespan;
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



module.exports = getMovies;
