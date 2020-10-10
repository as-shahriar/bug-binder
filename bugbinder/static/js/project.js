document.querySelectorAll(".assign-btn").forEach((e) => {
  e.addEventListener("click", () => {
    id = e.getAttribute("data-id");

    dev = document.getElementById(`select-${id}`).value;
    if (dev == "") return;

    form = new FormData();
    form.append("id", id);
    form.append("username", dev);
    fetch("/assign/", {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          p = document.createElement("p");
          i = document.createElement("i");
          i.setAttribute("class", "fa fa-code");
          i.setAttribute("style", "margin-right: 0.5rem;");
          span = document.createElement("span");
          span.textContent = "Assigned to";
          span.setAttribute("style", "margin-right: 0.5rem;");
          a = document.createElement("a");
          a.setAttribute("target", "_blank");
          a.setAttribute("class", "white-text");
          a.setAttribute("href", `/u/${dev}`);
          a.innerHTML = `<b>${dev}</b>`;
          p.appendChild(i);
          p.appendChild(span);
          p.appendChild(a);
          document.getElementById(`div-${id}`).innerHTML = "";
          document.getElementById(`div-${id}`).appendChild(p);
          document.getElementById("assigned-c").textContent =
            parseInt(document.getElementById("assigned-c").textContent) + 1;
        }
      });
  });
});

document.querySelectorAll(".delete-btn").forEach((e) => {
  e.addEventListener("click", () => {
    id = e.getAttribute("data-id");
    form = new FormData();
    form.append("id", id);
    fetch("/delete_task/", {
      method: "POST",
      body: form,
    }).then(res=>res.json()).then(data=>{
      if (data.status=200)
      document.getElementById(`post-${id}`).innerHTML = "";
    });
  });
});

document.querySelector("#delete-project").addEventListener("click", () => {
  id=document.getElementById('project-id').value;
  form = new FormData();
    form.append("id", id);
    fetch("/delete_project/", {
      method: "POST",
      body: form,
    }).then(res=>res.json()).then(data=>{
      if (data.status=200)
      location.href = "/dashboard";
    });
  
});

document.querySelector("#edit-project-save").addEventListener("click", () => {
  id=document.getElementById('project-id').value;
  title = document.getElementById('title').value;
  description = document.getElementById('description').value;
  if (title=="" || description=="") return;

  form = new FormData();
  form.append("id", id);
  form.append("title", title);
  form.append("description", description);
  fetch("/edit_project/", {
    method: "POST",
    body: form,
  }).then(res=>res.json()).then(data=>{
    if (data.status=200){
      document.getElementById("project-title").textContent = title.trim();
      document.getElementById("cancel-modal-edit").click();}
  });
});



document.querySelector("#search-dev").addEventListener("click", () => {
  email = document.getElementById("dev-email").value;
  if (email=="") return;
  form = new FormData();
  form.append("email", email);
  fetch("/search_dev/", {
    method: "POST",
    body: form,
  }).then(res=>res.json()).then(data=>{
    if (data.status==200){
      if(data.github == undefined) 
      document.getElementById("dev-img").src =`/static/img/user.png`;
      else
      document.getElementById("dev-img").src =`https://github.com/${data.github}.png`;
      document.getElementById("dev-name").textContent = data.name;
      document.getElementById("dev-preview").style.display = "block";
      document.getElementById("username").value = data.username;
    }
    else{
      document.getElementById("dev-email").classList.add("invalid");
      document.getElementById("dev-preview").style.display = "none";
    }

  });

});


document.querySelector("#save-dev").addEventListener("click", () => {
  username = document.getElementById("username").value;
  project_id = document.getElementById('project-id').value;
  form = new FormData();
  form.append("dev_username", username);
  form.append("project_id",project_id);
  fetch("/save_dev/", {
    method: "POST",
    body: form,
  }).then(res=>res.json()).then(data=>{
    
    if(data.status==200){
      document.getElementById("cancel-modal-dev-add").click();
    }
  });
});