document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});

forget = document.getElementById("forget");
login = document.getElementById("login");
reset = document.getElementById("reset");
document.getElementById("forget-triger").addEventListener("click", () => {
  login.style.display = "none";
  forget.style.display = "block";
});
document.getElementById("login-triger").addEventListener("click", () => {
  forget.style.display = "none";
  login.style.display = "block";
});
document.getElementById("login-triger2").addEventListener("click", () => {
  reset.style.display = "none";
  login.style.display = "block";
});

document.getElementById("reset-triger").addEventListener("click", () => {
  forget.style.display = "none";
  login.style.display = "none";
  reset.style.display = "block";
});

// login starts
document.getElementById("login-btn").addEventListener("click", () => {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  if (email == "" || password == "") return;

  form = new FormData();
  form.append("username", email);
  form.append("password", password);
  form.append("login", "");
  fetch("/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) location.href = "/dashboard";
      else document.getElementById("login-error").style.display = "flex";
    });
});

document.getElementById("signup-btn").addEventListener("click", () => {
  username = document.getElementById("susername").value;
  email = document.getElementById("sign-email").value;
  password = document.getElementById("sign-password").value;
  if (email == "" || password == "") return;

  form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("password", password);
  form.append("signup", "");
  fetch("/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) location.href = "/profile";
      else document.getElementById("signup-error").style.display = "flex";
    });
});
