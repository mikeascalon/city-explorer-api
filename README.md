# Project Name

**Author**: Michelangelo Ascalon

**Version**: 5.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview

This project is aimed at creating a React application that leverages Axios to fetch data from two different third-party APIs. The backend consists of two APIs, one for retrieving weather information and another for fetching movie data. The frontend will then utilize a location API to enhance user experience.

## Getting Started

To begin your work on the backend of this project, start by navigating to the backend directory within your project using the terminal. Execute the command cd cit-explorer-api to switch to the appropriate location. Subsequently, install the required backend dependencies by running npm install. Once the dependencies are installed, initiate the backend server with the command npm start. Monitor the terminal for any error messages or logs to ensure that the server is successfully running, typically accessible at `http://localhost:3001` or another specified port. Open your preferred code editor to explore the backend codebase, likely built using Node.js and Express.js, and look for relevant files like server.js or app.js. Identify and inspect the API endpoints responsible for fetching weather and movie data, ensuring they are correctly configured. With these steps completed, you are now ready to make modifications to the backend code, handling requests from the frontend and interacting with external APIs to provide the necessary data to the client application.

## Architecture

The application is built using the following technologies:

Backend:

Node.js
Express.js
Axios
Frontend:

React
Axios
The backend has two APIs, one for weather information and another for movies. The frontend uses the Axios library to make asynchronous requests to these APIs and dynamically updates the UI based on the received data. Additionally, a location API is utilized to enhance user interaction.

## Change Log

12-04-2023 2100  Initialized the backend server using Express.js

* Introduced `/api/location` endpoint to fetch location data for enhanced user experience.

* Created `/api/movies` endpoint to fetch movie data from a third-party API.

12-05-2023 14 00   Established connection to a MongoDB database for data storage.

* Created `/api/weather` endpoint to fetch weather data from a third-party API.

* Using each data point from the static data of the city that the user searched, create an array of `Forecast` objects, one for each day. Do the necessary data wrangling to ensure the objects you create contain the information as required for correct client rendering. See the sample response.

12-06-2023 14 00  * Created `/api/movies` endpoint to fetch movie data from a third-party API.

12-07-2023 Reorganized code structure for better maintainability.

Credit and Coll

## Credit and Collaborations

Location IQ

WeatherBit

Render

ChatGPT
