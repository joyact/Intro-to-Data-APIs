const Container = document.getElementById('container');
const sortByTime = document.getElementById('time');
const sortByMood = document.getElementById('mood');

let selfies = [];

sortByTime.addEventListener('click', () => {
  sortData((a, b) => b.time - a.time);
});

sortByMood.addEventListener('click', () => {
  sortData((a, b) => (a.mood > b.mood ? 1 : -1));
});

function sortData(compare) {
  selfies.sort(compare);
  for (let item of selfies) {
    Container.append(item.list);
  }
}

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {
    const list = document.createElement('div');
    const geo = document.createElement('p');
    const date = document.createElement('p');
    const mood = document.createElement('p');
    const image = document.createElement('img');
    const dateString = new Date(item.timestamp).toLocaleString();

    geo.textContent = `lat : ${item.lat}°, lon : ${item.lon}°`;
    date.textContent = dateString;
    mood.textContent = `mood: ${item.mood}`;
    image.src = item.image64;
    image.alt = "today's mood";

    list.append(geo, date, mood, image);
    selfies.push({ list: list, time: item.timestamp, mood: item.mood });
    Container.append(list);
  }
}

getData();
