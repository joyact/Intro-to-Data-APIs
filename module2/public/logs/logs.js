const Container = document.getElementById('container');

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const list = document.createElement('div');
    const geo = document.createElement('p');
    const date = document.createElement('p');
    const mood = document.createElement('p');
    const image = document.createElement('img');
    const dateString = new Date(item.timestamp).toLocaleDateString();

    geo.textContent = `lat : ${item.lat}°, lon : ${item.lon}°`;
    date.textContent = dateString;
    mood.textContent = `mood: ${item.mood}`;
    image.src = item.image64;

    list.append(geo, date, mood, image);
    Container.append(list);
  }
}
getData();
