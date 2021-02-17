const Container = document.getElementById('container');

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const list = document.createElement('ul');
    const geo = document.createElement('li');
    const date = document.createElement('li');

    geo.textContent = `lat : ${item.lat}°, lon : ${item.lon}°`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;

    list.append(geo, date);
    Container.append(list);
  }
}
getData();
