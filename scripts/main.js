async function getUpcoming() {
  const info = await fetch('http://84.201.153.211:8081/api/tmdb/details/movie/upcoming')
  .then(response => response.json())
  .then(json => [json].map(j => {
    const obj = {
      results: j.results,
    }
    return obj;
  }));
  upcomings = info[0].results;
  //console.log(upcomings);
  classname = document.getElementsByClassName('upcoming');
  for (let i = 0; i < 20; i++) {
    //console.log(array[i].id);
    if (i == 0){
      classname[0].innerHTML =
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${upcomings[i].id}')" href="movieDetails.html"><img src="${getPoster(upcomings[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${upcomings[i].id}">${upcomings[i].title}</a>
          </figcaption>
        </figure>
      </div>`
    }
    else {
      classname[0].innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${upcomings[i].id}')" href="movieDetails.html"><img src="${getPoster(upcomings[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${upcomings[i].id}">${upcomings[i].title}</a>
          </figcaption>
        </figure>
      </div>`
    }
  }
}
async function getNew() {
  const info = await fetch('http://84.201.153.211:8081/api/tmdb/discover/movie?primary_release_date.lte=2019-12-17&sort_by=release_date.desc')
  .then(response => response.json())
  .then(json => [json].map(j => {
    const obj = {
      results: j.results,
    }
    return obj;
  }));
  news = info[0].results;
  //console.log(news);
  classname = document.getElementsByClassName('new');
  for (let i = 0; i < 20; i++) {
    //console.log(array[i].id);
    if (i == 0){
      classname[0].innerHTML =
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${news[i].id}')" href="movieDetails.html"><img src="${getPoster(news[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${news[i].id}">${news[i].title}</a>
          </figcaption>
        </figure>
      </div>`
    }
    else {
      classname[0].innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${news[i].id}')" href="movieDetails.html"><img src="${getPoster(news[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${news[i].id}">${news[i].title}</a>
          </figcaption>
        </figure>
      </div>`
    }
  }
}
async function getBest() {
  const info = await fetch('http://84.201.153.211:8081/api/tmdb/details/movie/top_rated')
  .then(response => response.json())
  .then(json => [json].map(j => {
    const obj = {
      results: j.results,
    }
    return obj;
  }));
  best = info[0].results;
  //console.log(best);
  classname = document.getElementsByClassName('best');
  for (let i = 0; i < 20; i++) {
    //console.log(array[i].id);
    if (i == 0){
      classname[0].innerHTML =
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${best[i].id}')" href="movieDetails.html"><img src="${getPoster(best[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${best[i].id}">${best[i].title}</a>
          </figcaption>
        </figure>
      </div>`
    }
    else {
      classname[0].innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${best[i].id}')" href="movieDetails.html"><img src="${getPoster(best[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${best[i].id}">${best[i].title}</a>
          </figcaption>
        </figure>
      </div>`
    }
  }
}
async function getTop() {
  const info = await fetch('http://84.201.153.211:8081/api/tmdb/details/tv/top_rated')
  .then(response => response.json())
  .then(json => [json].map(j => {
    const obj = {
      results: j.results,
    }
    return obj;
  }));
  series = info[0].results;
  //console.log(info[0].results);
  classname = document.getElementsByClassName('top');
  for (let i = 0; i < 20; i++) {
    //console.log(array[i].id);
    if (i == 0) {
    classname[0].innerHTML =
      `<div class="cardBorder">
        <figure>
          <a id="movie_link" onclick="clickedLink('${series[i].id}')" href="seriesDetails.html"><img src="${getPoster(series[i].poster_path)}" class="cardImage"></a>
          <figcaption class="cardText">
            <a id="movie_link" href="movieDetails.html" class="cardText" name="${series[i].id}">${series[i].name}</a>
          </figcaption>
        </figure>
      </div>`
    }
    else {
      classname[0].innerHTML +=
        `<div class="cardBorder">
          <figure>
            <a id="movie_link" onclick="clickedLink('${series[i].id}')" href="seriesDetails.html"><img src="${getPoster(series[i].poster_path)}" class="cardImage"></a>
            <figcaption class="cardText">
              <a id="movie_link" href="movieDetails.html" class="cardText" name="${series[i].id}">${series[i].name}</a>
            </figcaption>
          </figure>
        </div>`
    }
  }
}
