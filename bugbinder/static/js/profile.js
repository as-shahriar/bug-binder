document.addEventListener("DOMContentLoaded", function () {
  edit = document.getElementById("edit-btn");
  save = document.getElementById("save-btn");
  edit_section = document.getElementById("edit-section");
  view_section = document.getElementById("view-section");
  changep = document.getElementById("passwordChange-triger");
  edit.addEventListener("click", () => {
    view_section.style.display = "none";
    edit_section.style.display = "flex";
    edit.style.display = "none";
    save.style.display = "block";
    changep.style.display = "block";
  });

  save.addEventListener("click", () => {
    view_section.style.display = "flex";
    edit_section.style.display = "none";
    edit.style.display = "block";
    save.style.display = "none";
    changep.style.display = "none";
  });

  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});
