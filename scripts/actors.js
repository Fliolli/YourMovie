async function getActors() {
  for (let j = 1; j < 4; j++) {
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
            <a href=""><img src="${getPoster(actors[i].profile_path)}" alt="image" class="cardImage"></a>
            <figcaption class="cardText">
              <a href="" class="cardText">${actors[i].name}</a>
            </figcaption>
          </figure>
        </div>`;
      } else {
      classname.innerHTML +=
      `<div class="cardBorder">
        <figure>
          <a href=""><img src="${getPoster(actors[i].profile_path)}" alt="image" class="cardImage"></a>
          <figcaption class="cardText">
            <a href="" class="cardText">${actors[i].name}</a>
          </figcaption>
        </figure>
      </div>`;
      }
    }
  }
}
