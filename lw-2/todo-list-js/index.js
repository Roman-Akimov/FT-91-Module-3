const tasks = [];

function addTask() {
  const newTask = document.getElementById("new-task").value;
  if (newTask.trim() !== "") {
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;

    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    const taskNameElement = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const changeBtn = document.createElement("button");
    const contBtn = document.createElement("div");
    changeBtn.textContent = "✏";
    deleteBtn.textContent = "❌";

    taskNameElement.innerText = newTask;
    listItem.appendChild(taskNameElement);
    contBtn.appendChild(changeBtn);
    contBtn.appendChild(deleteBtn);
    listItem.appendChild(contBtn);

    listItem.addEventListener("click", function () {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      listItem.classList.toggle("completed");
    });

    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      tasks.splice(taskIndex, 1); // удаляю из массива
      listItem.remove(); // удаляю саму запись
    });

    changeBtn.addEventListener("click", function(event) {
      event.stopPropagation();
      let newName = prompt('Изменить заметку');

      if (newName && newName.trim() !== ""){
        tasks[taskIndex].task = newName;
        taskNameElement.textContent = newName;
      }
    })

    document.getElementById("todo-list").appendChild(listItem);
    document.getElementById("new-task").value = "";
  }
}

document.getElementById("add-button").onclick = addTask;
