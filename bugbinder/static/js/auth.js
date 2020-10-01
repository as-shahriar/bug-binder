let global_email = "";
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

document.getElementById("forget-btn").addEventListener("click", () => {
  email = document.getElementById("femail").value;
  if (email == "") return;
  global_email = email;
  form = new FormData();
  form.append("email", email);
  fetch("/forget/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) document.getElementById("reset-triger").click();
      else document.getElementById("forget-error").style.display = "flex";
    });
});

document.getElementById("reset-btn").addEventListener("click", () => {
  code = document.getElementById("rcode").value;
  pass1 = document.getElementById("rpass1").value;
  pass2 = document.getElementById("rpass2").value;
  if (code == "" || pass1 == "" || pass2 == "") return;
  if (pass1 != pass2) {
    document.getElementById("reset-error").style.display = "flex";
    document.getElementById("error-text-reset").textContent =
      "Password didn't match.";
    return;
  }

  form = new FormData();
  form.append("code", code);
  form.append("password", pass1);
  form.append("email", global_email);
  fetch("/reset/", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) location.href = "/dashboard";
      else {
        document.getElementById("reset-error").style.display = "flex";
        document.getElementById("error-text-reset").textContent =
          "Wrong credentials. Try again.";
      }
    });
});
