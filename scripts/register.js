function register() {
  let name = document.getElementById('Username').value;
  let login = document.getElementById('Login').value;
  let password = document.getElementById('Password').value;
  let repeat = document.getElementById('Repeat').value;
  let email = document.getElementById('Email').value;

  if (name === null || name === "") {
    alert('Enter name');
  } else
    if (login === null || login === "") {
      alert('Enter login');
    } else
      if (password === null || password === "") {
        alert('Enter password');
      } else
        if (repeat === null || repeat === "" || repeat != password) {
          alert('Passwords must be equal');
        } else
          if (email === null || email === "" || !validateEmail(email)) {
            alert('Enter valid email');
          } else {
            let register = {
              name: name,
              login: login,
              password: password,
              email: email
            }
            //console.log(JSON.stringify(register, '\t', 2));
            let myHeader = new Headers();
            myHeader.append("Content-Type", "application/json");

            let raw = JSON.stringify(register);

            let requestOptions = {
              method: 'POST',
              headers: myHeader,
              body: raw,
              redirect: 'follow'
            };
            fetch("http://84.201.153.211:8081/api/registration", requestOptions)
            .then(function(response) {
              if (response.status == 409) {
                alert('This login is in use :( \n Try another one!');
              } else
                if (response.status == 200) {
                  alert('Successfully registered. Login now!');
                }
            });
      }
}
function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
