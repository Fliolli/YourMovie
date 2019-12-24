async function sort() {
  let genre, type, rating, min_date, max_date, string = "";
  if (document.getElementById('genres').value != "") {
    genre = document.getElementById('genres').value;
    string += `?with_genres=${genre}`;
  }
  if (document.getElementById('type').value != "") {
    type = document.getElementById('type').value;
    if (string === "")
      string += `?sort_by=${type}`;
    else
      string += `&sort_by=${type}`;
  }
  if (document.getElementById('rating').value != "") {
    rating = document.getElementById('rating').value;
    if (string === "")
      string += `?vote_average.gte=${rating}`;
    else
      string += `&vote_average.gte=${rating}`;
  }
  if (document.getElementById('min_year').value != "") {
    min_date = document.getElementById('min_year').value;
    if (string === "")
      string += `?first_air_date.lte=${min_date}-01-01`;
    else
      string += `&first_air_date.lte=${min_date}-01-01`;
  }
  if (document.getElementById('max_year').value != "") {
    max_date = document.getElementById('max_year').value;
    if (string === "")
      string += `?first_air_date.gte=${max_date}-01-01`;
    else
      string += `&first_air_date.gte=${max_date}-01-01`;
  }
  //console.log(string);
  const pages = await fetch(`http://84.201.153.211:8081/api/tmdb/discover/tv${string}`)
  .then(response => response.json())
  .then(json => [json].map(j => {
    const obj = {
      total_pages: j.total_pages,
    }
    return obj;
  }));
  //console.log(pages);
  if (pages[0].total_pages > 20)
    num = 20;
  else
    num = pages[0].total_pages;
  if (num != 0) {
    if (string != "")
      query = `http://84.201.153.211:8081/api/tmdb/discover/tv${string}&page=`;
    else
      query = `http://84.201.153.211:8081/api/tmdb/discover/tv?page=`;
    for (let j = 1; j < num + 1; j++) {
      const info = await fetch(`${query}${j}`)
      .then(response => response.json())
      .then(json => [json].map(j => {
        const obj = {
          results: j.results,
        }
        return obj;
      }));
      movies = info[0].results;
      //console.log(movies);
      classname = document.getElementById('grid');
      for (let i = 0; i < movies.length; i++) {
        if (j == 1 && i == 0) {
          classname.innerHTML =
          `<div class="cardBorder">
            <figure>
              <a id="series_link" onclick="clickedLink('${movies[i].id}')" href="seriesDetails.html"><img src="${getPoster(movies[i].poster_path)}" class="cardImage"></a>
              <figcaption class="cardText">
                <a id="series_link" href="seriesDetails.html" class="cardText" name="${movies[i].id}">${movies[i].title}</a>
              </figcaption>
            </figure>
          </div>`;
        } else {
        classname.innerHTML +=
        `<div class="cardBorder">
          <figure>
            <a id="series_link" onclick="clickedLink('${movies[i].id}')" href="seriesDetails.html"><img src="${getPoster(movies[i].poster_path)}" class="cardImage"></a>
            <figcaption class="cardText">
              <a id="series_link" href="seriesDetails.html" class="cardText" name="${movies[i].id}">${movies[i].title}</a>
            </figcaption>
          </figure>
        </div>`;
        }
      }
    }
  }
  else {
    document.getElementById('grid').innerHTML = `<a class="logo">NOT FOUND</a>`;
  }
}
