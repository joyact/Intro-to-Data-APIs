// Node module Express : create a web server

const express = require('express'); // import express
const app = express(); // excute express and put in a variable

// listen at a specific port
app.listen(3000, () => console.log('listening at 3000'));

// let the server host static content
// anything in this directory is publicly accessible from URL
app.use(express.static('public'));

// let the server parse any incoming data as JSON
app.use(express.json({ limit: '1mb' }));

const database = [];

// set up the endpoint for my route called 'api'
app.post('/api', (request, response) => {
  // receive data request from the client
  console.log('I got a request!');
  console.log(request.body);

  // every time the server receives new data, push it to database
  const data = request.body;
  database.push(data);
  console.log(database);

  // send back to client
  response.json({
    status: 'success',
    latitude: request.body.lat,
    longitudt: request.body.lon,
  });
});
