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

            document.getElementById("bugs-c").textContent =
            parseInt(document.getElementById("bugs-c").textContent) - 1;
            previous_data = myChart.data.datasets[0].data
            myChart.data.datasets[0].data=[previous_data[0]-1,previous_data[1]+1,previous_data[2]]
            myChart.update()    
            btn = document.getElementById(`delete-task-${id}`)
            if (btn) btn.style.display="none"
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
      document.getElementById(`post-${id}`).remove()
      previous_data = myChart.data.datasets[0].data
            myChart.data.datasets[0].data=[previous_data[0]-1,previous_data[1],previous_data[2]]
            myChart.update()  
            document.getElementById("bugs-c").textContent =
            parseInt(document.getElementById("bugs-c").textContent) - 1;
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
      add_dev_component(data.user_id,username,"d"); //add in desktop
      add_dev_component(data.user_id,username,"m"); //add in mobile
      clear_add_dev();
    }
    else if(data.status==403)document.getElementById("cancel-modal-dev-add").click();
  });
});

document.getElementById("cancel-modal-dev-add").addEventListener("click",()=> clear_add_dev());

document.querySelectorAll(".delete-dev").forEach(e=>{
    
      e.addEventListener("click",()=>{
        remove_event(e);
      });
});


function add_dev_component(id,username,version){
  div1 = document.createElement("div")
  div1.setAttribute("class","dev-item")
  div1.setAttribute("id",`${version}-dev-item-${id}`)
  a =  document.createElement("a")
  a.setAttribute("href",`/u/${username}`)
  a.setAttribute("target","_blank")
  i = document.createElement("i")
  i.setAttribute("class","fa fa-code")
  span = document.createElement("span")
  span.textContent = username
  span.setAttribute("id",`dev-username-${version}${id}`)
  i2 = document.createElement("i")
  i2.setAttribute("class","fa fa-trash delete-dev")
  i2.setAttribute("data-did",id)
  i2.setAttribute("style","margin-left: 0.8rem")
  

  a.appendChild(i)
  a.appendChild(span)
  div1.appendChild(a)
  div1.appendChild(i2)
 
  document.querySelector(`#${version}-dev-add-root`).prepend(div1)
  i2.addEventListener("click",()=>remove_event(i2))
}


function remove_event(e){
  project_id = document.getElementById('project-id').value;
  id = e.getAttribute("data-did")
  dusername = document.querySelector(`#dev-username-d${id}`)
  musername = document.querySelector(`#dev-username-m${id}`)

  username = (dusername)?dusername.textContent:musername.textContent;

  
  var r = confirm(`Remove ${username} from the dev list?`)
  if (r == true) {
    form = new FormData()
    form.append("dev_id",id)
    form.append("project_id",project_id)
    fetch('/remove_dev/',{
      method:"POST"
      ,body:form
    }).then(res=>res.json()).then(data=>{
        
        if (data.status==200){
          document.querySelector(`#d-dev-item-${id}`).remove()
          document.querySelector(`#m-dev-item-${id}`).remove()
        }
    });
    
  } 

}

document.getElementById("copy-btn").addEventListener("click",()=>{
    dummy = document.createElement("input"),
    document.body.appendChild(dummy);
    dummy.value = `http://127.0.0.1:8000/issue/public/${document.getElementById('project-id').value}`;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  
});



function clear_add_dev(){
  input = document.getElementById("dev-email");
  preview = document.getElementById("dev-preview");
  if(input) input.value="";
  if (preview) preview.style.display = "none";
}