let lat, lon;
if ('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async (position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);

    // To prevent the API key exposed in the client side.
    // set up a proxy server(call API in the server side)
    const api_url = `weather/${lat},${lon}`; // weather : the endpoint
    const response = await fetch(api_url);
    const json = await response.json();

    document.getElementById('description').textContent = json.weather[0].main;
    document.getElementById('temperature').textContent = json.main.temp;
    console.log(json);
    console.log(json.weather);
  });
} else {
  console.log('geolocation not available');
}

const button = document.getElementById('checkin');
button.addEventListener('click', async (event) => {
  const data = { lat, lon };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch('/api', options);
  const json = await response.json();
  console.log(json);
});
