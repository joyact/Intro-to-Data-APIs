console.log('about to fetch an image');

async function fetchFamily() {
  const response = await fetch('family.jpg');
  const blob = await response.blob(); // blob = image source
  document.getElementById('family').src = URL.createObjectURL(blob);
}

fetchFamily()
  .then((response) => {
    console.log('succeed');
  })
  .catch((error) => {
    console.log('failed');
    console.error(error);
  });

/*
fetch('family.jpg').then(response => {
  console.log(response);
  return response.blob();
}).then(blob=> {
  console.log(blob)
  document.getElementById('family').src = URL.createObjectURL(blob);
}).catch(error=>{
  console.log(error)
  console.error(error)
})
*/
