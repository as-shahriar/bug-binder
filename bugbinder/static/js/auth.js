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
