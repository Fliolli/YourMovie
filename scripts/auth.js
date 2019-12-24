async function saveInfo() {
  if (document.getElementById('loginInput').value != "" && document.getElementById('passwordInput').value != "") {
    var user = document.getElementById('loginInput').value;
    var pass = document.getElementById('passwordInput').value;
    var myHeaders = new Headers();
    console.log(user);
    console.log(pass);
    myHeaders.append("Authorization", "Basic " + btoa(user + ":" + pass));
    console.log("Basic " + btoa(user + ":" + pass));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("http://84.201.153.211:8081/api/client/whoami", requestOptions)
    .then(function(response) {
      if (response.status == 401) {
        alert('Wrong login or password');
      } else
        if (response.status == 200) {
          Cookies.set('user',user, {expires: 1});
          Cookies.set('pass',pass, {expires: 1});
          window.open("profilePage.html","_self");
        }
    });
  } else {
    alert('Fill all fields, please!');
  }
}
