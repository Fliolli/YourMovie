async function getSeries() {
  for (let j = 1; j < 4; j++) {
    const info = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/popular?page=${j}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        results: j.results,
      }
      return obj;
    }));
    series = info[0].results;
    //console.log(movies);
    classname = document.getElementById('grid');
    for (let i = 0; i < series.length; i++) {
      if (j == 1 && i ==0) {
        classname.innerHTML =
        `<div class="cardBorder">
          <figure>
            <a href=""><img src="https://image.tmdb.org/t/p/w500${series[i].poster_path}" alt="Red Sparrow" class="cardImage"></a>
            <figcaption class="cardText">
              <a href="" class="cardText">${series[i].name}</a>
            </figcaption>
          </figure>
        </div>`;
      } else {
      classname.innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a href=""><img src="https://image.tmdb.org/t/p/w500${series[i].poster_path}" alt="Red Sparrow" class="cardImage"></a>
          <figcaption class="cardText">
            <a href="" class="cardText">${series[i].name}</a>
          </figcaption>
        </figure>
      </div>`;
      }
    }
  }
}
