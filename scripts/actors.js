async function getActors() {
  for (let j = 1; j < 10; j++) {
    const info = await fetch(`http://84.201.153.211:8081/api/tmdb/details/person/popular?page=${j}`)
    .then(response => response.json())
    .then(json => [json].map(j => {
      const obj = {
        results: j.results,
      }
      return obj;
    }));
    actors = info[0].results;
    //console.log(actors);
    classname = document.getElementById('grid');
    for (let i = 0; i < actors.length; i++) {
      if (j == 1 && i == 0) {
        classname.innerHTML =
        `<div class="cardBorder">
          <figure>
            <a id="actor_link" onclick="clickedLink('${actors[i].id}')" href="actorDetails.html"><img src="${getPoster(actors[i].profile_path)}" alt="${actors[i].name}" class="cardImage"></a>
            <figcaption class="cardText">
              <a href="" class="cardText">${actors[i].name}</a>
            </figcaption>
          </figure>
        </div>`;
      } else {
      classname.innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a id="actor_link" onclick="clickedLink('${actors[i].id}')" href="actorDetails.html"><img src="${getPoster(actors[i].profile_path)}" alt="${actors[i].name}" class="cardImage"></a>
          <figcaption class="cardText">
            <a href="" class="cardText">${actors[i].name}</a>
          </figcaption>
        </figure>
      </div>`;
      }
    }
  }
}
