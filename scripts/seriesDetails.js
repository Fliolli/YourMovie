async function details() {
  id = localStorage.getItem('id');
  console.log(id);
  movie = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/${id}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        name: j.name,
        overview: j.overview,
        number_of_seasons: j.number_of_seasons,
        origin_country: j.origin_country,
        production_companies: j.production_companies,
        vote_average: j.vote_average,
        original_language: j.original_language,
        status: j.status,
      }
      return obj;
  }));
  release = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/${id}/seasons/1`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        air_date: j.air_date,
      }
      return obj;
  }));
  video = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/${id}/videos`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        results: j.results,
      }
      return obj;
  }));
  images = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/${id}/images`)
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
  document.getElementById('title').innerHTML = movie[0].name;
  document.getElementById('description').innerHTML = getSomethingElse(movie[0].overview);
  document.getElementById('release').innerHTML = getSomethingElse(release[0].air_date);
  document.getElementById('country').innerHTML = getCountry(movie[0].origin_country);
  document.getElementById('seasons').innerHTML = getSeasons(movie[0].number_of_seasons);
  document.getElementById('status').innerHTML = getSomethingElse(movie[0].status);
  document.getElementById('rating').innerHTML = movie[0].vote_average;
  document.getElementById('lang').innerHTML = getSomethingElse(movie[0].original_language);
  document.getElementById('directing').innerHTML = getSomething(movie[0].production_companies);


  //Cast
  actors = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/${id}/credits`)
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
      <a id="actor_link" onclick="clickedLink('${actors[0].cast[i].id}')" href="actorDetails.html"><img src="${image}" class="listCardImage" alt="${actors[0].cast[i].name}"></a>
      <label class="cardText"><b>${actors[0].cast[i].name}</b></label>
      <label class="cardText">${actors[0].cast[i].character}</label>
    </div>`
  }

  //Episodes
  for (let j = 1; j < movie[0].number_of_seasons + 1; j++) {
    release = await fetch(`http://84.201.153.211:8081/api/tmdb/details/tv/${id}/seasons/${j}`)
      .then(response => response.json())
      .then(json => [json].map(j => {
        const obj = {
          episodes: j.episodes,
        }
        return obj;
    }));
    for (var i = 0; i < release[0].episodes.length; i++) {
      if (release[0].episodes[i].still_path === null)
        image = "images/error.jpg";
      else
        image = `https://image.tmdb.org/t/p/w500${release[0].episodes[i].still_path}`;
        document.getElementById('episodes').innerHTML+=
        `<div class="card epCardBody">
          <img src="${image}" class="epCardImage" alt="${release[0].episodes[i].name}">
          <label class="cardText"><b>${release[0].episodes[i].name}</b></label>
          <label class="cardText">Season ${release[0].episodes[i].season_number} Episode ${release[0].episodes[i].episode_number}</label>
          <button type="button" style="width:30%; margin-left:35%" class="btn" data-toggle="tooltip" data-placement="right" title="not viewed"><img src="images/plus.png" style="height:95%; width:95%" alt=""></button>
        </div>`
    }

  }
}
function getCountry(arr) {
  string = "";
  arr.forEach(function(item) {
    if (string != ""){
      string += ", ";
    }
    string += item;
  });
  if (string === "")
    return `Unknown`;
  return string;
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
function getSomethingElse(time){
  if (time != null)
    return `${time}`;
  else
    return `Unknown`;
}
function getSeasons(time){
  if (time != null)
    if (time > 1)
      return `${time} seasons`;
    else
      return `${time} season`;
  else
    return `Unknown`;
}
