const axios = require('axios');

// Define a route for the root endpoint
async function getMovies(req, res) {

  const { searchQuery } = req.query;
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${process.env.MOVIES_ACCESS_KEY}`;

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
