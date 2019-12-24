console.log(Cookies.get('user'));
if (Cookies.get('user') === null || Cookies.get('user') === "" || Cookies.get('user') === undefined){
  document.getElementById('profile_ul').innerHTML +=
  `<li class="nav-item">
      <div class="dropdown mr-auto dropleft">
        <a class="btn btn-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </a>
        <div class="dropdown-menu">
          <form class="px-4 py-3">
            <div class="form-group">
              <label for="exampleDropdownFormEmail1">Login</label>
              <input type="login" class="form-control" id="loginInput" placeholder="email@example.com">
              <div class="invalid-feedback">
                Incorrect login!
              </div>
            </div>
            <div class="form-group">
              <label for="exampleDropdownFormPassword1">Password</label>
              <input type="password" class="form-control" id="passwordInput" placeholder="Password">
              <div class="invalid-feedback">
                Incorrect password!
              </div>
            </div>
            <button onclick="saveInfo(); return false;" class="btn btn-primary">Sign in</button>
          </form>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="registerPage.html">New around here? Sign up</a>
        </div>
      </div>
    </li>`;
}
else {
  document.getElementById('profile_ul').innerHTML +=
  `<li class="nav-item">
      <div class="dropdown dropleft">
        <a class="btn btn-primary dropdown-toggle" style="padding:0px" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="images/ym2.jpg" width="40" height="30" style="margin-right:10%; border-radius:7px; object-fit:scale-down" alt=""></a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="profilePage.html">Profile</a>
          <a class="dropdown-item" href="#">Settings</a>
          <a class="dropdown-item" onclick="exit();return false;">Exit</a>
        </div>
      </div>
    </li>`;
}

function exit() {
  Cookies.remove('user');
  Cookies.remove('pass');
  window.open("mainPage.html","_self");
}
