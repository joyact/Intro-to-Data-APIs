let lat, lon;
const sendDataToServer = document.getElementById('submit');

if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude.toFixed(4);
    lon = position.coords.longitude.toFixed(4);
    document.getElementById('latitude').textContent = lat;
    document.getElementById('longitude').textContent = lon;
  });
} else {
  console.log('geolocation not available');
}

sendDataToServer.addEventListener('click', async () => {
  const mood = document.getElementById('mood').value;
  console.log(mood);
  const data = { lat, lon, mood }; // data which is sent to server
  const options = {
    method: 'POST', // package as a POST
    headers: {
      // meta information
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // packaging up all of the data
  };

  const response = await fetch('/api', options); // send it to the endpoint
  const json = await response.json(); // get response from the server
  console.log(json);
});
