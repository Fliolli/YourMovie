async function getProfile() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + btoa(Cookies.get('user') + ":" + Cookies.get('pass')));
  //console.log(Cookies.get('user') + " " + Cookies.get('pass'));
  //console.log("Basic " + btoa(Cookies.get('user') + ":" + Cookies.get('pass')));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  response = await fetch("http://84.201.153.211:8081/api/client/lists/movie", requestOptions);
  obj = await response.json();
  //console.log(obj);

  for (let i in obj) {
    //console.log(obj[i]);
    document.getElementById('lists').innerHTML +=`<a class="dropdown-item" href="#">${obj[i].name}</a>`;
  }
  document.getElementById('num_of_lists').innerHTML = obj.length;
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic " + btoa(Cookies.get('user') + ":" + Cookies.get('pass')));
  console.log("Basic " + btoa(Cookies.get('user') + ":" + Cookies.get('pass')));
  var requestOptions1 = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  response = await fetch("http://84.201.153.211:8081/api/client/whoami", requestOptions);
  username = await response.json();
  document.getElementById('name').innerHTML = username.name;
}
