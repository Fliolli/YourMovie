async function details() {
  id = localStorage.getItem('id');
  console.log(id);
  movie = await fetch(`http://84.201.153.211:8081/api/tmdb/details/movie/${id}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        adult: j.adult,
        genres: j.genres,
        original_language: j.original_language,
        title: j.title,
        overview: j.overview,
        vote_average: j.vote_average,
        release_date: j.release_date,
        runtime: j.runtime,
        status: j.status,
        production_companies: j.production_companies,
        production_countries: j.production_countries,
      }
      return obj;
  }));
  video = await fetch(`http://84.201.153.211:8081/api/tmdb/details/movie/${id}/videos`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        results: j.results,
      }
      return obj;
  }));
  images = await fetch(`http://84.201.153.211:8081/api/tmdb/details/movie/${id}/images`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        backdrops: j.backdrops,
      }
      return obj;
  }));
  //console.log(images[0].backdrops.length);
  if (images[0].backdrops.length != 0) {
    for (let i = 0; i < images[0].backdrops.length; i++) {
      image_str = `https://image.tmdb.org/t/p/w500${images[0].backdrops[i].file_path}`;
      if (i == 0) {
        document.getElementById('carousel').innerHTML =
        `<div class="carousel-item active container">
          <img src="${image_str}" class="frame" alt=" ">
        </div>`;
      } else {
      document.getElementById('carousel').innerHTML +=
      `<div class="carousel-item container">
        <img src="${image_str}" class="frame" alt=" ">
      </div>`;
      }
    }
  } else {
    image_str = "images/error_horizontal.jpg";
    document.getElementById('carousel').innerHTML =
    `<div class="carousel-item active container">
      <img src="${image_str}" class="frame" alt=" ">
    </div>`
  }
  if (video[0].results.length != 0)
    video_str = `<iframe src="https://www.youtube.com/embed/${video[0].results[0].key}" frameborder="0" allowfullscreen></iframe>`;
  else
    video_str = `<iframe src="https://www.youtube.com/embed/9rIMZeSdsl0"></iframe>`;
  //console.log(video_str);
  document.getElementById('video').innerHTML = video_str
  document.getElementById('title').innerHTML = movie[0].title;
  document.getElementById('description').innerHTML = getSomethingElse(movie[0].overview);
  document.getElementById('release').innerHTML = getSomethingElse(movie[0].release_date);
  document.getElementById('country').innerHTML = getSomething(movie[0].production_countries);
  document.getElementById('runtime').innerHTML = getRunTime(movie[0].runtime);
  document.getElementById('genres').innerHTML = getSomething(movie[0].genres);
  document.getElementById('status').innerHTML = getSomethingElse(movie[0].status);
  document.getElementById('rating').innerHTML = movie[0].vote_average;
  document.getElementById('lang').innerHTML = getSomethingElse(movie[0].original_language);
  document.getElementById('directing').innerHTML = getSomething(movie[0].production_companies);
  document.getElementById('age').innerHTML = getAge(movie[0].adult);

  actors = await fetch(`http://84.201.153.211:8081/api/tmdb/details/movie/${id}/credits`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        cast: j.cast,
      }
      return obj;
  }));
  if (actors[0].cast.length > 40)
    num = 40;
  else
    num = actors[0].cast.length;
  for (let i = 0; i < num; i++) {
    if (actors[0].cast[i].profile_path === null)
      image = "images/error.jpg";
    else
      image = `https://image.tmdb.org/t/p/w500${actors[0].cast[i].profile_path}`;
    document.getElementById('scrollList').innerHTML+=
    `<div class="card listCardBody">
      <img src="${image}" class="listCardImage" alt="${actors[0].cast[i].name}">
      <label class="cardText"><b>${actors[0].cast[i].name}</b></label>
      <label class="cardText">${actors[0].cast[i].character}</label>
    </div>`
  }
}

function getSomething(arr) {
  string = "";
  arr.forEach(function(item) {
    if (string != ""){
      string += ", ";
    }
    string += item.name;
  });
  if (string === "")
    return `Unknown`;
  return string;
}
function getAge(age) {
  if (age)
    return '21+';
  else
    return 'Acceptable for children';
}
function getSomethingElse(time){
  if (time != null)
    return `${time}`;
  else
    return `Unknown`;
}
function getRunTime(time){
  if (time != null)
    return `${time} m`;
  else
    return `Unknown`;
}
