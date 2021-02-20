const express = require('express');
const Datastore = require('nedb');

// fetch is the client side browser API
// if you want to use it in Node, add a package.
const fetch = require('node-fetch');

const app = express();
app.listen(3000, () => console.log('Starting server: http://localhost:3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

// the server is a proxy for openweathermap
// make the API call from here and send it back to client
app.get('/weather/:latlon', async (request, response) => {
  console.log(request.params);
  const latlon = request.params.latlon.split(',');
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(latlon);
  console.log(lat, lon);

  const key = '9916e4e6fd6079aa9a9fec8e0c218fc5';
  // 1. the client 'lat, lon' -> the server
  // 2. the server 'lat, lon' -> the weather API
  // 3. the weather API 'weather' -> the server
  // 4. the server 'weather' -> the client
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const aq_url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  // Get multiple APIs
  const data = {
    weather: weather_data,
    air_quailty: aq_data,
  };

  response.json(data);
});
