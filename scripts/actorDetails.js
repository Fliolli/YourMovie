async function details() {
  id = localStorage.getItem('id');
  console.log(id);
  actor = await fetch(`http://84.201.153.211:8081/api/tmdb/details/person/${id}/movie_credits`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        cast: j.cast,
        crew: j.crew,
      }
      return obj;
  }));
  console.log(actor[0].cast.length);
  for (let i = 0; i < actor[0].cast.length; i++) {
    document.getElementById('acting_table').innerHTML +=
    `<tr>
      <td>
        <table class="tableGroup">
          <tr>
            <td class="" style="padding-left:20px">${actor[0].cast[i].release_date}</td>
            <td class="">Movie</td>
            <td class="">
              <a class="" href=""><bdi>${actor[0].cast[i].title}</bdi></a>
                <span style="color: rgba(0, 0 , 0, 0.5)"> as </span>${actor[0].cast[i].character}
            </td>
          </tr>
        </table>
      </td>
    </tr>`
  }
}
  //console.log(images[0].backdrops.length);
  /*if (images[0].backdrops.length != 0) {
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

  */
  //Cast
