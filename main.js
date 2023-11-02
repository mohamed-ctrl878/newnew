let sun = document.querySelector(".heading img");
let imgBg = document.querySelector(".imag-bg img");
let input = document.querySelector(".texter");
let tasks = document.querySelector(".tasks");
let btn = document.querySelector(".btn");
let num = document.querySelector(".number-of-items");
let clearBtn = document.querySelector(".clear-btn")
let selector = document.querySelectorAll(".selector span")


sun.addEventListener("click", ()=>{
    if(sun.src.includes("/images/icon-sun.svg")){
        document.styleSheets[1].cssRules[0].style.setProperty("--bg-color", "hsl(235, 21%, 11%)")
        document.styleSheets[1].cssRules[0].style.setProperty("--main-c", "hsl(235, 24%, 19%)")//hsl(235, 24%, 19%)
        imgBg.src = "images/bg-desktop-dark.jpg"
        sun.src = "images/icon-moon.svg"
    }else{
        sun.src = "images/icon-sun.svg"
        imgBg.src = "images/bg-desktop-light.jpg"
        document.styleSheets[1].cssRules[0].style.setProperty("--bg-color", "hsl(236, 33%, 92%)")
        document.styleSheets[1].cssRules[0].style.setProperty("--main-c", "hsl(0, 0%, 98%)")
    }
})


// if(tasks.s)
setTimeout(function(){
    tasks.classList.add("flex")
    if(tasks.clientHeight < 330){
        tasks.classList.add("over-flow-h")
    }else{
        tasks.classList.remove("over-flow-h")
    }
},500)


tasks.addEventListener("click", (e)=>{
    if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove()
        removFromLocal(e.target.parentElement.getAttribute("ifequl"))
        num.innerHTML = `${document.querySelectorAll(".task").length} items`
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done")
        toggleTheTask(e.target.getAttribute("ifequl"))
    }
    if(e.target.classList.contains("shako")){
        e.target.parentElement.parentElement.classList.toggle("done")
        toggleTheTask(e.target.parentElement.parentElement.getAttribute("ifequl"))
    }
    if(e.target.classList.contains("big-o")){
        e.target.parentElement.classList.toggle("done")
        toggleTheTask(e.target.parentElement.getAttribute("ifequl"))
    }
})

let arrayOfTasks = [];

clearBtn.addEventListener("click",()=>{
    document.querySelectorAll(".done").forEach(e=>{
        e.remove()
    })
    clearFromLocal()
})

if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

getDataFromLocal()

btn.addEventListener("click", ()=>{
    console.log(tasks.clientHeight)
    if(tasks.clientHeight < 330){
        tasks.classList.add("over-flow-h")
    }else{
        tasks.classList.remove("over-flow-h")
    }
    if(input.value !== ""){
        pushInputInArray(input.value)
        selector.forEach(e=>{
            e.classList.remove("reactive")
        })
        selector[0].classList.add("reactive")
    }
    input.value = ""
})

function pushInputInArray(input){
    const tasks = {
        id : Date.now(),
        task: input,
        status:false
    }
    arrayOfTasks.push(tasks);
    createElementsFromArray(arrayOfTasks)
    localStorageFromThis(arrayOfTasks);
}


function createElementsFromArray(arrayOfTasks){
    console.log(arrayOfTasks)
    console.log(tasks)
    tasks.innerHTML= ""
    arrayOfTasks.forEach(tas => {
        let createTask =document.createElement("div")
    let spanOne =document.createElement("span")
    let spanTwo =document.createElement("span")
    spanTwo.className = "del"
        createTask.setAttribute("ifequl", tas.id)
        spanOne.className = "big-o"
        spanTwo.className = "remove"
        let sepo = document.createElement("span")
        sepo.className = "shako"
        spanOne.appendChild(sepo)
        createTask.className = "task";
        if(tas.status){
            createTask.className = "task done";
        }
        let createText = document.createTextNode(tas.task)
        spanTwo.appendChild(document.createTextNode("x"))
        createTask.appendChild(spanOne)
        createTask.appendChild(createText);
        createTask.appendChild(spanTwo);
        tasks.appendChild(createTask);
        num.innerHTML = document.querySelectorAll(".task").length + " Items"
    });
    
}

function localStorageFromThis(tasks){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function getDataFromLocal(){
    if(window.localStorage.getItem("tasks")){
        let jso = JSON.parse(window.localStorage.getItem("tasks"))
        createElementsFromArray(jso)
    }
}



function removFromLocal(ip){
    arrayOfTasks = arrayOfTasks.filter(e=>{
        return e.id.toString() != ip
    })
    localStorageFromThis(arrayOfTasks)
}


function toggleTheTask(taskid){
    for(let i = 0; i <arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id.toString() === taskid){
            (arrayOfTasks[i].status == false )? (arrayOfTasks[i].status = true) : (arrayOfTasks[i].status = false);
    }
}
localStorageFromThis(arrayOfTasks)
}


function clearFromLocal(){
    arrayOfTasks = arrayOfTasks.filter(e=>{
        return e.status !== true
    })
    num.innerHTML = document.querySelectorAll(".task").length + " Items"
    localStorageFromThis(arrayOfTasks)
}


selector.forEach(e=>{
    e.addEventListener("click", (el)=>{
        
        selector.forEach(e=>{
            e.classList.remove("reactive")
        })
        
        if(el.currentTarget.classList.contains("active")){
            num.innerHTML = document.querySelectorAll(".task:not(.done)").length + " Items"
            el.currentTarget.classList.add("reactive")
            document.querySelectorAll(".task").forEach(ele=>{
                ele.style.opacity = 0
                ele.style.display = "none"
                setTimeout(()=>{

                    ele.style.opacity = 0
                },300)
            })
            document.querySelectorAll(".task:not(.done)").forEach(ele=>{
                ele.style.opacity = 0
                ele.style.display = "block"
                setTimeout(()=>{
                    
                    ele.style.opacity = 1
                },300)
            })
            
        }
        // 
        else if(el.currentTarget.classList.contains("combeleted")){
            num.innerHTML = document.querySelectorAll(".done").length + " Items"
            document.querySelectorAll(".task").forEach(ele=>{
                ele.style.opacity = 0
                ele.style.display = "block"
                setTimeout(()=>{
                    ele.style.opacity = 1
                },300)
            })
            document.querySelectorAll(".task:not(.done)").forEach(ele=>{
                ele.style.opacity = 0
                ele.style.display = "none"
                setTimeout(()=>{
                    ele.style.opacity = 0
                },300)
            })
            
            el.currentTarget.classList.add("reactive")
        }
        
        else if(el.currentTarget.classList.contains("all")){
            num.innerHTML = document.querySelectorAll(".task").length + " Items"
            document.querySelectorAll(".task").forEach(ele=>{
                ele.style.opacity = 0
                ele.style.display = "block"
                setTimeout(()=>{

                    ele.style.opacity = 1
                },300)
            })
            document.querySelectorAll(".task:not(.done)").forEach(ele=>{
                ele.style.opacity = 0
                ele.style.display = "block"
                setTimeout(()=>{

                    ele.style.opacity = 1
                },300)
            })
            el.currentTarget.classList.add("reactive")
        }
        if(tasks.clientHeight < 330){
            tasks.classList.add("over-flow-h")
        }else if(tasks.clientHeight > 330){
            tasks.classList.remove("over-flow-h")
        }
    })
})


