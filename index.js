let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentTask;
let taskInput = document.getElementById("task-input");
let tasksList = document.getElementById("tasks-list");
let addButton = document.getElementById("add-button");
let clearButton = document.getElementById("clear-button");
function handleKeyUp(e) {
  if (e.keyCode === 13) {
    addTask();
  }
}
function displayTask(task) {
  let newTask = document.createElement("div");
  newTask.className = "task-wrapper";
  let checkBoxWrapper = document.createElement("div");
  let checkBox = document.createElement("input");
  let taskText = document.createElement("label");

  checkBoxWrapper.className = "custom-control custom-checkbox mb-3";

  checkBox.type = "checkbox";
  checkBox.className = "custom-control-input";
  checkBox.id = `checkbox${task.id}`;

  taskText.className = "custom-control-label";
  taskText.htmlFor = checkBox.id;
  taskText.innerHTML = task.value;

  checkBoxWrapper.appendChild(checkBox);
  checkBoxWrapper.appendChild(taskText);

  newTask.appendChild(checkBoxWrapper);
  return newTask;
}
function addTask() {
  if (taskInput.value) {
    tasks.push(taskInput.value);
    let newTask = displayTask({ id: tasks.length - 1, value: taskInput.value });
    tasksList.appendChild(newTask);
    taskInput.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}
function handleClear(e) {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.lastChild);
  }
  localStorage.clear();
}
taskInput.addEventListener("keyup", handleKeyUp);
addButton.addEventListener("click", addTask);
clearButton.addEventListener("click", handleClear);
if (tasks && tasks.length > 0) {
  tasks.forEach((task, index) => {
    tasksList.appendChild(displayTask({ id: index, value: task }));
  });
}
