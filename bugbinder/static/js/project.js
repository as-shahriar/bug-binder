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
    document.getElementById(`post-${id}`).innerHTML = "";
    console.log(id);
  });
});

document.querySelector("#delete-project").addEventListener("click", () => {
  location.href = "/dashboard";
});
