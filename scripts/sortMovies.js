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
  if (document.getElementById('min_year').value != "" && document.getElementById('min_year').value <= 2020 && document.getElementById('min_year').value >= 1890) {
    min_date = document.getElementById('min_year').value;
    if (string === "")
      string += `?release_date.lte=${min_date}-01-01`;
    else
      string += `&release_date.lte=${min_date}-01-01`;
  }
  if (document.getElementById('max_year').value != "" && document.getElementById('max_year').value <= 2020 && document.getElementById('max_year').value >= 1890) {
    max_date = document.getElementById('max_year').value;
    if (string === "")
      string += `?release_date.gte=${max_date}-01-01`;
    else
      string += `&release_date.gte=${max_date}-01-01`;
  }
  const pages = await fetch(`http://84.201.153.211:8081/api/tmdb/discover/movie${string}`)
  .then(response => response.json())
  .then(json => [json].map(j => {
    const obj = {
      total_pages: j.total_pages,
    }
    return obj;
  }));
  //console.log(pages);
  if (pages[0].total_pages > 10)
    num = 10;
  else
    num = pages[0].total_pages;
  if (string != "")
    query = `http://84.201.153.211:8081/api/tmdb/discover/movie${string}&page=`;
  else
    query = `http://84.201.153.211:8081/api/tmdb/discover/movie?page=`;
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
    console.log(movies);
    classname = document.getElementById('grid');
    for (let i = 0; i < movies.length; i++) {
      if (j == 1 && i == 0) {
        classname.innerHTML =
        `<div class="cardBorder">
          <figure>
            <a href=""><img src="${getPoster(movies[i].poster_path)}" alt="image" class="cardImage"></a>
            <figcaption class="cardText">
              <a href="" class="cardText">${movies[i].title}</a>
            </figcaption>
          </figure>
        </div>`;
      } else {
      classname.innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a href=""><img src="${getPoster(movies[i].poster_path)}" alt="image" class="cardImage"></a>
          <figcaption class="cardText">
            <a href="" class="cardText">${movies[i].title}</a>
          </figcaption>
        </figure>
      </div>`;
      }
    }
  }
}
