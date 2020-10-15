document.getElementById("submit").addEventListener("click",()=>{
    email = document.getElementById("email")
    title = document.getElementById("title")
    reproduce= document.getElementById("reproduce")
    environment= document.getElementById("environment")
    comment = document.getElementById("comment")
    
   
    if(title.value == "") {
        title.classList.add("invalid")
        return
    }
    else{
        title.classList.remove("invalid")
    }
    if(reproduce.value == "") {
        reproduce.classList.add("invalid")
        return
    }
    else{
        reproduce.classList.remove("invalid")
    }
    if(environment.value == "") {
        environment.classList.add("invalid")
        return
    }
    else{
        environment.classList.remove("invalid")
    }
    if(email.value == "") {
        email.classList.add("invalid")
        return
    }
    else{
        title.classList.remove("invalid")
    }
    form = new FormData()
    form.append("title",title.value)
    form.append("reproduce",reproduce.value)
    form.append("environment",environment.value)
    form.append("comment",comment.value)
    form.append("email",email.value)
    id= document.getElementById('project-id').value
    fetch(`/issue/public/${id}`,{
        method:"POST",
        body: form
    }).
    then(res=>res.json()).
    then(data=>{
        if(data.status==200) {
            document.getElementById("bug-report").remove()
            document.getElementById("msg").style.display = "block";
        }
        
    });

   
});