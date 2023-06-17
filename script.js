let addBtn = document.querySelector(".add_btn");
let input = document.querySelector(".input-task");
let list = document.querySelector(".list");
let deleteAll = document.querySelector('.delete-all');


let arrayOfTasks = [];


if(localStorage.getItem("tasks")){
   arrayOfTasks = JSON.parse(localStorage.getItem("tasks"))
}

//trigger get data from storage 
getDataFromStorage();
checkStorage();

addBtn.onclick = function () {
  if (input.value != "") {
    addTaskToArray(input.value);
    input.value = "";
    input.focus();
  }
};

deleteAll.onclick = function(){
   list.innerHTML = "";
   localStorage.clear();
   window.location.reload();
 
}

list.addEventListener('click',(e)=>{
      //delete btn 
      if(e.target.classList.contains('delete-btn')){

         let parentEl = e.target.parentElement.parentElement;
               //remove task from storage
       deleteTaskWith(parentEl.getAttribute("data-id"));

       parentEl.classList.add('fall');
       parentEl.addEventListener('transitionend',()=>{
                 parentEl.remove();
       });
      }
      //complete task
         if(e.target.classList.contains('done-btn')){
            let parentEl = e.target.parentElement.parentElement;
            //toggle completed for task
            toggleTaskStatu(parentEl.getAttribute("data-id"));
            parentEl.classList.toggle('done');
         }
})

function addTaskToArray(taskName) {
  //task data as json object
  const task = {
    id: Date.now(),
    title: taskName,
    completed: false,
  };

  //push data to array

  arrayOfTasks.push(task);
  //add tasks to page
  addElementsToPageFrom(arrayOfTasks);

  //add tasks to local storage 
  addDataToStorage(arrayOfTasks);

  console.log(JSON.stringify(arrayOfTasks));

}

function addElementsToPageFrom(arrayOfTasks) {
  //empty tasks list
  list.innerHTML = "";
  //looping on array of tasks
  arrayOfTasks.forEach((task) => {
    let card = document.createElement("div");
    card.className="card";
    if(task.completed){
      card.className="card done";
    }
    card.setAttribute("data-id", task.id);
    let task_name = document.createElement("div");
    task_name.className="task__name";
    let name = document.createElement("span");
    name.className="name";
    name.innerText = task.title;

    let icons = document.createElement("div");
    icons.className="icons";
    let doneBtn = document.createElement("div");
    doneBtn.className="done-btn";
    doneBtn.innerHTML = '  <span class="material-symbols-outlined">done</span>';
    let deleteBtn = document.createElement("div");
    deleteBtn.className="delete-btn";
    deleteBtn.innerHTML =
      '<span class="material-symbols-outlined">delete</span>';

    card.appendChild(task_name);
    task_name.appendChild(name);
    card.appendChild(icons);
    icons.appendChild(doneBtn);
    icons.appendChild(deleteBtn);
   list.appendChild(card);

   
  
  });
}

function addDataToStorage(data){
   window.localStorage.setItem("tasks",JSON.stringify(data));
   

}

function getDataFromStorage(){
   let data = window.localStorage.getItem("tasks");
   if(data){
      let tasks =  JSON.parse(data);
      addElementsToPageFrom(tasks);
     
   }
}

function deleteTaskWith(id){
  arrayOfTasks = arrayOfTasks.filter((task)=>task.id != id);
   addDataToStorage(arrayOfTasks);
   checkStorage();
}

function toggleTaskStatu(id){
      for (let i = 0; i < arrayOfTasks.length; i++) {
         if(arrayOfTasks[i].id == id){
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false
         }
         
      }
      addDataToStorage(arrayOfTasks);
}


function checkStorage(){
  

   if(arrayOfTasks){
         if(arrayOfTasks.length === 0){
           list.innerHTML = '<h1> Tasks List is Empty !</h1>';
         }
   }

  
}
