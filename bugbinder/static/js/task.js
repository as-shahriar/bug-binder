
document.querySelectorAll('.submit').forEach(e=>{
        e.addEventListener("click",()=>{
            id = e.getAttribute("data-id")
            solution = document.getElementById(`solution-${id}`).value
            form = new FormData()
            form.append("task_id",id)
            form.append("solution",solution)
            fetch('/task/',{
              method:"POST"
              ,body:form
            }).then(res=>res.json()).then(data=>{
                if (data.status==200){
                    project_id = document.getElementById("project-id").value
                    location.href=`/project/${project_id}`
                }
            });
        })
});