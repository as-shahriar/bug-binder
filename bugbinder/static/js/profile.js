edit = document.getElementById("edit-btn");
save = document.getElementById("save-btn");
edit_section = document.getElementById("edit-section");
view_section = document.getElementById("view-section");

edit.addEventListener("click", () => {
  view_section.style.display = "none";
  edit_section.style.display = "flex";
  edit.style.display = "none";
  save.style.display = "block";
});

save.addEventListener("click", () => {
  view_section.style.display = "flex";
  edit_section.style.display = "none";
  edit.style.display = "block";
  save.style.display = "none";
});
