// Node module Express : create a web server

const express = require('express'); // import express
const app = express(); // excute express and put in a variable

// listen at a specific port
app.listen(3000, () => console.log('listening at 3000'));

//serve statoc content
// anything in this directory is publicly accessible from URL
app.use(express.static('public'));
