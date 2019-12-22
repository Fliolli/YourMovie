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
  for (let i = 0; i < 6; i++) {
    //console.log(array[i].id);
    classname[i].innerHTML =
    `<figure>
      <a href=""><img src="https://image.tmdb.org/t/p/w500${upcomings[i].poster_path}" alt="Red Sparrow" class="cardImage"></a>
      <figcaption class="cardText">
        <a href="" class="cardText">${upcomings[i].title}</a>
      </figcaption>
    </figure>`
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
  for (let i = 0; i < 6; i++) {
    //console.log(array[i].id);
    classname[i].innerHTML =
    `<figure>
      <a href=""><img src="https://image.tmdb.org/t/p/w500${news[i].poster_path}" alt="Red Sparrow" class="cardImage"></a>
      <figcaption class="cardText">
        <a href="" class="cardText">${news[i].title}</a>
      </figcaption>
    </figure>`
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
  for (let i = 0; i < 6; i++) {
    //console.log(array[i].id);
    classname[i].innerHTML =
    `<figure>
      <a href=""><img src="https://image.tmdb.org/t/p/w500${best[i].poster_path}" alt="Red Sparrow" class="cardImage"></a>
      <figcaption class="cardText">
        <a href="" class="cardText">${best[i].title}</a>
      </figcaption>
    </figure>`
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
  //console.log(info[0].results);
  classname = document.getElementsByClassName('top');
  for (let i = 0; i < 6; i++) {
    //console.log(array[i].id);
    classname[i].innerHTML =
    `<figure>
      <a href=""><img src="https://image.tmdb.org/t/p/w500${info[0].results[i].poster_path}" alt="Red Sparrow" class="cardImage"></a>
      <figcaption class="cardText">
        <a href="" class="cardText">${info[0].results[i].name}</a>
      </figcaption>
    </figure>`
  }
}
