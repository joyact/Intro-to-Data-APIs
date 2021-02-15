const express = require('express'); // create a web server
const Datastore = require('nedb'); // create a database

const app = express(); // excute express and put in a variable

app.listen(3000, () => console.log('listening at 3000')); // listen at a specific port
app.use(express.static('public')); // let the server host static content (publicly accessible files)
app.use(express.json({ limit: '1mb' })); // let the server parse any incoming data as JSON

const database = new Datastore('database.db'); // new database
database.loadDatabase(); // create a database when the server is ran

// set up the endpoint for my route called 'api'
app.post('/api', (request, response) => {
  // receive data request from the client
  console.log('I got a request!');
  const data = request.body;

  // every time the server receives new data, push it to database
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data); // insert data to database

  // send back to client
  response.json({
    status: 'success',
    timestamp: timestamp,
    latitude: data.lat,
    longitudt: data.lon,
  });
});
