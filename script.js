// select the elements

const todoInput = document.querySelector(".todo-input");

const addBtn = document.querySelector('.add-btn');

const deleteBtn = document.querySelector('.delete-btn');

const clearBtn = document.querySelector('.clear-btn');

const todoContainer = document.querySelector('.todo-container');

//add button add new to-do when clicked
addBtn.addEventListener('click', addTask);

//clear button delete all todos when clicked
clearBtn.addEventListener('click', clearTodoList);

let todoList;

//invoke checkStorage function
checkStorage();

//invoke checkStorage function
printTask();

//get todoList from localStorage and add new to-do in todoList and restore it in local storage
function addTask(){
  let task = todoInput.value;
  if (task == '') {
    alert("Please enter todo first!");
    return;
  }
  
  let retrivedTodoList =  retriveTodoList();
  retrivedTodoList.push(task);
  storeTodoList(retrivedTodoList);
  todoInput.value = '';
  
  printTask();
}

//get todoList from local storage and print todos 
function printTask() {
  let retrivedTodoList =  retriveTodoList();
  if (retrivedTodoList === null) {
    todoContainer.innerHTML = '';
    return;
  }
  todoContainer.innerHTML = '';
  for (let i = 0; i < retrivedTodoList.length; i++) {
    todoContainer.innerHTML += `<div class="todo-box">
            <p class="todo">${retrivedTodoList[i]}</p>
            <div>
              <button class="btn edit-btn" type="submit" onclick="editTask(${i})">Edit</button>
              <button class="btn delete-btn" type="submit" onclick="deleteTask(${i})">Delete</button>
            </div>
          </div>`
  }
}

//editTask takes index of todo of todoList and search todo by index and put value in input area and create done button and replace it with add button
let doneBtn;
function editTask(i) {
  let retrivedTodoList =  retriveTodoList();
  todoInput.value = retrivedTodoList[i];
  // Create a new button element
  doneBtn = document.createElement('button');
  doneBtn.classList.add('btn', 'done-btn');
  doneBtn.textContent = 'Done';
  doneBtn.onclick = function() {
    editDone(i, retrivedTodoList);
  };
  
  addBtn.replaceWith(doneBtn);
 }

//editDone takes index of a todo and todoList retrieved from local storage and add edited todo value on same index and replace doneBtn with addBtn
function editDone(i, retrivedTodoList) {
  if (todoInput.value == '') {
    alert("Please enter todo first!");
    todoInput.value = '';
    doneBtn.replaceWith(addBtn);
    return;
  }
   retrivedTodoList[i] = todoInput.value;
   storeTodoList(retrivedTodoList);
   printTask();
   todoInput.value = '';
   doneBtn.replaceWith(addBtn);
}

//deleteTask takes index of todo who's delete button clicked and retrieve todoList from local storage and remove the todo from todoList using index and store the updated todoList in local storage
function deleteTask(i){
  let retrivedTodoList =  retriveTodoList();
  retrivedTodoList.splice(i, 1);
  storeTodoList(retrivedTodoList);
  printTask();
}

//storeTodoList takes an array and store it in local storage having reference todoList
function storeTodoList(arr){
  localStorage.setItem('todoList', JSON.stringify(arr));
}

//retriveTodoList retrieve todoList array from local storage and return it
function retriveTodoList() {
  return JSON.parse(localStorage.getItem('todoList'));
}

//clearTodoList clear the todoList stored in local storage 
function clearTodoList() {
  localStorage.clear();
  printTask();
  checkStorage()
}


//check availability of todoList in local storage if not available then store it
function checkStorage() {
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
    storeTodoList(todoList);
  }
}