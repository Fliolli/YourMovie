async function details() {
  id = localStorage.getItem('id');
  console.log(id);
  actor = await fetch(`http://84.201.153.211:8081/api/tmdb/details/person/${id}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        birthday: j.birthday,
        profile_path: j.profile_path,
        deathday: j.deathday,
        name: j.name,
        gender: j.gender,
        biography: j.biography,
        place_of_birth: j.place_of_birth,
        known_for_department: j.known_for_department,
      }
      return obj;
  }));
  document.getElementById('actor_image').src = `https://image.tmdb.org/t/p/w500${actor[0].profile_path}`;
  actor_job_mov = await fetch(`http://84.201.153.211:8081/api/tmdb/details/person/${id}/movie_credits`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        cast: j.cast,
      }
      return obj;
  }));
  actor_job_tv = await fetch(`http://84.201.153.211:8081/api/tmdb/details/person/${id}/tv_credits`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        cast: j.cast,
      }
      return obj;
  }));
  actor_job_mov[0].cast.sort(function (a,b) {
    if (a.release_date > b.release_date) {
      return 1;
    }
    if (a.release_date < b.release_date || a.release_date === null || b.release_date === null || a.release_date === "" || b.release_date === "") {
      return -1;
    }
    return 0;
  });
  actor_job_tv[0].cast.sort(function (a,b) {
    if (a.first_air_date > b.first_air_date) {
      return 1;
    }
    if (a.first_air_date < b.first_air_date || a.first_air_date === null || b.first_air_date === null || a.first_air_date === "" || b.first_air_date === "") {
      return -1;
    }
    return 0;
  });
  //console.log(actor[0]);
  document.getElementById('known_for').innerHTML = actor[0].known_for_department;
  document.getElementById('gender').innerHTML = getGender(actor[0].gender);
  document.getElementById('birth').innerHTML = getDate(actor[0].birthday);
  document.getElementById('death').innerHTML = getDeath(actor[0].deathday);
  document.getElementById('place').innerHTML = getDate(actor[0].place_of_birth);
  document.getElementById('bio').innerHTML = actor[0].biography;
  document.getElementById('actor_name').innerHTML = actor[0].name;
  if (actor_job_mov[0].cast.length != 0) {
    document.getElementById('acting_table').innerHTML += '<a class="logo" style="padding-left:38%;">MOVIES</a>';
    for (let i = 0; i < actor_job_mov[0].cast.length; i++) {
      document.getElementById('acting_table').innerHTML +=
      `<tr>
        <td>
          <table class="tableGroup">
            <tr>
              <td class="" style="padding-left:20px; width:140px">${getDate(actor_job_mov[0].cast[i].release_date)}</td>
              <td class="" style="padding-left:20px; width:90px">Movie</td>
              <td class="" style="padding-left:5px">
                <a id="movie_link" onclick="clickedLink('${actor_job_mov[0].cast[i].id}')" href="movieDetails.html"><bdi>${actor_job_mov[0].cast[i].title}</bdi></a>
                  <span style="color: rgba(0, 0 , 0, 0.5)"> as </span>${getDate(actor_job_mov[0].cast[i].character)}
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    }
  }
  if (actor_job_tv[0].cast.length != 0) {
    document.getElementById('acting_table').innerHTML +=
    `<a class="logo" style="padding-left:40%;">SERIES</a>`;
    for (let i = 0; i < actor_job_tv[0].cast.length; i++) {
      document.getElementById('acting_table').innerHTML +=
      `<tr>
        <td>
          <table class="tableGroup">
            <tr>
              <td class="" style="padding-left:20px; width:140px">${getDate(actor_job_tv[0].cast[i].first_air_date)}</td>
              <td class="" style="padding-left:20px; width:90px">Series</td>
              <td class="" style="padding-left:5px">
                <a id="series_link" onclick="clickedLink('${actor_job_tv[0].cast[i].id}')" href="seriesDetails.html"><bdi>${actor_job_tv[0].cast[i].name}</bdi></a>
                  <span style="color: rgba(0, 0 , 0, 0.5)"> as </span>${getDate(actor_job_tv[0].cast[i].character)}
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    }
  }
  if (actor_job_tv[0].cast.length === 0 && actor_job_mov[0].cast.length === 0) {
    document.getElementById('acting_table').innerHTML +=
    `<a class="logo" style="padding-left:40%;">EMPTY</a>`;
  }
  actor_job_mixed = await fetch(`http://84.201.153.211:8081/api/tmdb/details/person/${id}/combined_credits`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        crew: j.crew,
      }
      return obj;
  }));
  if (actor_job_mixed[0].crew.length != 0) {
    for (let i = 0; i < actor_job_mixed[0].crew.length; i++) {
      document.getElementById('crew_table').innerHTML +=
      `<tr>
        <td>
          <table class="tableGroup">
            <tr>
              <td class="" style="padding-left:20px; width:140px">${getDate(actor_job_mixed[0].crew[i].release_date)}</td>
              <td class="" style="padding-left:20px; width:90px">${getDate(actor_job_mixed[0].crew[i].job)}</td>
              <td class="" style="padding-left:5px">
                <a id="movie_link" onclick="clickedLink('${actor_job_mixed[0].crew[i].id}')" href="movieDetails.html"><bdi>${actor_job_mixed[0].crew[i].title}</bdi></a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    }
  }
  else {
    document.getElementById('crew_table').innerHTML +=
    `<a class="logo" style="padding-left:40%;">EMPTY</a>`;
  }
}
function getDeath(date) {
  if (date === null)
    return 'Alive';
  else
    return date;
}
function getGender(gender) {
  if (gender == 1)
    return 'Woman';
  else
    return 'Man';
}
function getDate(date) {
  if (date === null || date === "")
    return 'Unknown';
  else
    return date;
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
