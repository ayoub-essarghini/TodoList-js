

const addBtn = document.querySelector('.add_btn');
const input = document.querySelector('.input-task');
const list = document.querySelector('.list');


addBtn.addEventListener('click',addTask);

list.addEventListener('click',completeOrDelete);



function addTask(e){
    e.preventDefault();

   const card =document.createElement('div');
   card.classList.add('card');

    const task_name = document.createElement('div');
    task_name.classList.add('task__name');
    const name = document.createElement('span');
    name.classList.add('name');
    name.innerText = input.value;

    const icons = document.createElement('div');
    icons.classList.add('icons');
    const doneBtn = document.createElement('div');
    doneBtn.classList.add('done-btn');
    doneBtn.innerHTML = '  <span class="material-symbols-outlined">done</span>';
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">delete</span>';

    card.appendChild(task_name);
    task_name.appendChild(name);
    card.appendChild(icons);
    icons.appendChild(doneBtn);
    icons.appendChild(deleteBtn);

    list.appendChild(card);

    input.value = "";

}

function completeOrDelete(e){
   const item = e.target;

  


//    console.log(item.classList)

   if(item.classList[0] === 'done-btn'){
        const cardElem = item.parentElement.parentElement;
        cardElem.classList.toggle('done');
   } 
   if(item.classList[0] === 'delete-btn'){
      const cardElem = item.parentElement.parentElement;

      cardElem.classList.add('fall');
      cardElem.addEventListener('transitionend',()=>{
      cardElem.remove();
      });
   } 
}





