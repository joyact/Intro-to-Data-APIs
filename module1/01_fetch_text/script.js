fetchPoem()
  .then((poem) => {
    console.log('succeeded!');
    document.getElementById('poem').innerHTML = poem;
  })
  .catch((error) => {
    console.log('failed!');
    console.error(error);
  });

async function fetchPoem() {
  const response = await fetch('poem.txt');
  return await response.text();
}
