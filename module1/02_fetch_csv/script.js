// Data from: https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp

chartIt();

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Global Average Temperature in °C',
          data: data.temps,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
  });
}

async function getData() {
  const years = [];
  const temps = [];

  const response = await fetch('ZonAnn.Ts+dSST.csv');
  const data = await response.text();

  const table = data.split('\n').slice(1);
  table.forEach((row) => {
    const columns = row.split(',');
    const year = columns[0];
    const temp = columns[1];
    years.push(year);
    temps.push(parseFloat(temp) + 14);
  });
  return { years, temps };
}
