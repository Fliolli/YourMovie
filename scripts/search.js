document.getElementById('search_button').onclick = function () {
  line = document.getElementById('search_line').value;
  localStorage.setItem('line',line);
}

async function search() {
  line = localStorage.getItem('line');
  movie_pages = await fetch(`http://84.201.153.211:8081/api/tmdb/search/movie?query=${line}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        total_pages: j.total_pages,
      }
      return obj;
  }));
  series_pages = await fetch(`http://84.201.153.211:8081/api/tmdb/search/tv?query=${line}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        total_pages: j.total_pages,
      }
      return obj;
  }));
  if (movie_pages[0].total_pages != 0 && series_pages[0].total_pages != 0) {
    if ((movie_pages[0].total_pages >= series_pages[0].total_pages && series_pages[0].total_pages >= 40) || (movie_pages[0].total_pages <= series_pages[0].total_pages && movie_pages[0].total_pages >= 40))
      num = 40;
    else
      if (movie_pages[0].total_pages >= series_pages[0].total_pages)
        num = series_pages[0].total_pages;
      else
        num = movie_pages[0].total_pages;
    for (let j = 1; j < num + 1; j++) {
      const m_info = await fetch(`http://84.201.153.211:8081/api/tmdb/search/movie?query=${line}&page=${j}`)
      .then(response => response.json())
      .then(json => [json].map(j => {
        const obj = {
          results: j.results,
        }
        return obj;
      }));
      const s_info = await fetch(`http://84.201.153.211:8081/api/tmdb/search/tv?query=${line}&page=${j}`)
      .then(response => response.json())
      .then(json => [json].map(j => {
        const obj = {
          results: j.results,
        }
        return obj;
      }));
      movies = m_info[0].results;
      series = s_info[0].results;
      //console.log(movies);
      classname = document.getElementById('grid');
      for (let i = 0; i < movies.length; i++) {
        if (j == 1 && i == 0) {
          classname.innerHTML =
          `<div class="cardBorder">
            <figure>
              <a id="movie_link" onclick="clickedLink('${movies[i].id}')" href="movieDetails.html"><img src="${getPoster(movies[i].poster_path)}" class="cardImage"></a>
              <figcaption class="cardText">
                <a id="movie_link" href="movieDetails.html" class="cardText" name="${movies[i].id}">${movies[i].title}</a>
              </figcaption>
            </figure>
          </div>
          <div class="cardBorder">
          <figure>
            <a id="movie_link" onclick="clickedLink('${series[i].id}')" href="seriesDetails.html"><img src="${getPoster(series[i].poster_path)}" class="cardImage"></a>
            <figcaption class="cardText">
              <a id="movie_link" href="movieDetails.html" class="cardText" name="${series[i].id}">${series[i].name}</a>
            </figcaption>
          </figure>
          </div>`;
        } else {
        classname.innerHTML +=
        `<div class="cardBorder">
          <figure>
            <a id="movie_link" onclick="clickedLink('${movies[i].id}')" href="movieDetails.html"><img src="${getPoster(movies[i].poster_path)}" class="cardImage"></a>
            <figcaption class="cardText">
              <a id="movie_link" href="movieDetails.html" class="cardText" name="${movies[i].id}">${movies[i].title}</a>
            </figcaption>
          </figure>
        </div>`;
        classname.innerHTML +=
        `<div class="cardBorder">
          <figure>
            <a id="movie_link" onclick="clickedLink('${series[i].id}')" href="seriesDetails.html"><img src="${getPoster(series[i].poster_path)}" class="cardImage"></a>
            <figcaption class="cardText">
              <a id="movie_link" href="movieDetails.html" class="cardText" name="${series[i].id}">${series[i].name}</a>
            </figcaption>
          </figure>
        </div>`;
        }
      }
    }
  }
  else {
    classname = document.getElementById('grid').innerHTML = `<a class="logo">NOT FOUND</a>`;
  }
}
function getPoster(path) {
  if (path === null)
    return `images/error.jpg`
  else {
    return `https://image.tmdb.org/t/p/w500${path}`
  }
}
