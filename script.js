let draggedTask = null;

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  draggedTask = e.target;
}

function drop(e) {
  e.preventDefault();
  if (draggedTask) {
    e.target.closest(".task-list").appendChild(draggedTask);
    saveData();
  }
}

function addTask(columnId) {
  const text = prompt("Enter task:");
  if (!text) return;

  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.innerText = text;

  task.addEventListener("dragstart", drag);

  document.querySelector(`#${columnId} .task-list`).appendChild(task);
  saveData();
}

function saveData() {
  const data = {
    todo: getTasks("todo"),
    inprogress: getTasks("inprogress"),
    done: getTasks("done")
  };
  localStorage.setItem("kanbanData", JSON.stringify(data));
}

function getTasks(columnId) {
  return Array.from(
    document.querySelectorAll(`#${columnId} .task`)
  ).map(task => task.innerText);
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("kanbanData"));
  if (!data) return;

  for (let col in data) {
    const container = document.querySelector(`#${col} .task-list`);
    data[col].forEach(text => {
      const task = document.createElement("div");
      task.className = "task";
      task.draggable = true;
      task.innerText = text;
      task.addEventListener("dragstart", drag);
      container.appendChild(task);
    });
  }
}

loadData();
