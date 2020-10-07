document.addEventListener("DOMContentLoaded", function () {
  edit = document.getElementById("edit-btn");
  save = document.getElementById("save-btn");
  edit_section = document.getElementById("edit-section");
  view_section = document.getElementById("view-section");
  changep = document.getElementById("passwordChange-triger");
  edit.addEventListener("click", () => {
    name = document.getElementById("name").textContent;
    email = document.getElementById("email").textContent;
    mobile = document.getElementById("mobile").textContent;
    office = document.getElementById("office").textContent;
    github = document.getElementById("github").value;
    linkedin = document.getElementById("linkedin").value;

    if (name != "None" && name.charAt(0) != "-")
      document.getElementById("ename").value = name;
    if (email != "None") document.getElementById("eemail").value = email;
    if (mobile != "None" && mobile.charAt(0) != "-")
      document.getElementById("emobile").value = mobile;
    if (office != "None" && office.charAt(0) != "-")
      document.getElementById("eoffice").value = office;
    if (github != "None") document.getElementById("egithub").value = github;
    if (linkedin != "None")
      document.getElementById("elinkedin").value = linkedin;
    view_section.style.display = "none";
    edit_section.style.display = "flex";
    edit.style.display = "none";
    save.style.display = "block";
    changep.style.display = "block";
  });

  save.addEventListener("click", () => {
    ename = document.getElementById("ename").value;
    eemail = document.getElementById("eemail").value;
    emobile = document.getElementById("emobile").value;
    eoffice = document.getElementById("eoffice").value;
    egithub = document.getElementById("egithub").value;
    elinkedin = document.getElementById("elinkedin").value;
    if (egithub != null) egithub = egithub.trim();
    if (eemail == "") return;

    form = new FormData();
    form.append("name", ename);
    form.append("email", eemail);
    form.append("mobile", emobile);
    form.append("office", eoffice);
    form.append("github", egithub);
    form.append("linkedin", elinkedin);
    fetch("/profile/", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          document.getElementById("name").textContent = ename;
          document.getElementById("email").textContent = eemail;
          document.getElementById("mobile").textContent = emobile;
          document.getElementById("office").textContent = eoffice;
          document.getElementById("github").value = egithub;
          document.getElementById("linkedin").value = elinkedin;
          if (egithub != null && egithub != "") {
            document.getElementById(
              "user-image"
            ).src = `https://github.com/${egithub}.png`;
          }
          if (
            elinkedin != null &&
            elinkedin != "" &&
            document.getElementById("linkedin-link") != null
          ) {
            document.getElementById(
              "linkedin-link"
            ).href = `https://www.linkedin.com/in/${elinkedin}`;
          }
          if (
            egithub != null &&
            egithub != "" &&
            document.getElementById("github-link") != null
          ) {
            document.getElementById(
              "github-link"
            ).href = `https://github.com/${egithub}`;
          }

          view_section.style.display = "flex";
          edit_section.style.display = "none";
          edit.style.display = "block";
          save.style.display = "none";
          changep.style.display = "none";
        } else {
          document.getElementById("eemail").setAttribute("class", "invalid");
        }
      });
  });

  document.getElementById("change_pass").addEventListener("click", () => {
    current_p = document.getElementById("c_pass").value;
    pass1 = document.getElementById("pass1").value;
    pass2 = document.getElementById("pass2").value;
    error = document.getElementById("password-error");
    if (current_p == "" || pass1 == "" || pass2 == "") return;
    if (pass1 != pass2) return;

    form = new FormData();
    form.append("c_pass", current_p);
    form.append("password", pass1);

    fetch("/password_change/", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          document.getElementById("cancel-btn").click();
        } else {
          error.style.display = "flex";
        }
      });
  });

  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});
