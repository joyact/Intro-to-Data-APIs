const filenames = [
  'images/dunphy.jpg',
  'images/mitchell.jpg',
  'images/jay.jpg',
];

fetchFamilies(filenames)
  .then((response) => {
    console.log('succeeded!');
  })
  .catch((error) => {
    console.log('failed!');
    console.error(error);
  });

async function fetchFamilies(families) {
  for (family of families) {
    const response = await fetch(family);
    const blob = await response.blob();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(blob);
    img.width = 600;
    document.body.appendChild(img);
  }
}
