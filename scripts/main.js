
const info = fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=e1b18b05fca2b45bb018471acea0fe94&language=en-US&page=1')
.then(response => response.json())
.then(json => [json].map(j => {
  const obj = {
    results: j.results,
  }
  return obj;
}));
console.log(document.getElementsByClassName('cardBorder').length);
for (let i = 0; i < cards.length; i++) {
  console.log(x[i]);
}
