function addSeries(list_id, movie_id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic " + btoa(Cookies.get('user') + ":" + Cookies.get('pass')));

  var raw = JSON.stringify([{object_id:movie_id}]);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://84.201.153.211:8081/api/list/tv/${list_id}/items`, requestOptions)
    .then(function(response) {
      if (response.status == 200) {
        alert('Successfully added!');
      }
    });
}
function addMovie(list_id, movie_id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Basic " + btoa(Cookies.get('user') + ":" + Cookies.get('pass')));

  var raw = JSON.stringify([{object_id:movie_id}]);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://84.201.153.211:8081/api/list/movie/${list_id}/items`, requestOptions)
    .then(function(response) {
      if (response.status == 200) {
        alert('Successfully added!');
      }
    });

}
