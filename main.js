const tasks = [];
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-button");

taskInput.addEventListener("keypress", handleKeyPress);
addTaskButton.addEventListener("click", submitTask);

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submitTask();
  }
}

function submitTask() {
  const taskDescription = taskInput.value.trim();

  if (taskDescription) {
    addTask(taskDescription);
    renderTasks();
  }

  taskInput.value = "";
}

function addTask(description) {
  tasks.unshift({ id: Date.now(), description, status: "uncompleted" });
  console.log("tasks after submitting: ", tasks);
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    if (!taskList.firstElementChild) {
      taskElement.animate(
        {
          opacity: [0, 1],
          transform: ["translateY(-100%)", "translateY(0)"],
        },
        150
      );
    }
    taskList.appendChild(taskElement);
  });
}

function createTaskElement(task) {
  const taskElement = document.createElement("li");
  taskElement.classList.add("task-element");
  taskElement.id = `task-element-${task.id}`;

  const taskCheckbox = createTaskCheckbox(task);
  const taskLabel = createTaskLabel(task);
  const deleteTaskButton = createDeleteTaskButton(task, taskElement);

  taskElement.appendChild(taskCheckbox);
  taskElement.appendChild(taskLabel);
  taskElement.appendChild(deleteTaskButton);

  return taskElement;
}

function createTaskCheckbox(task) {
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.id = `task-${task.id}`;
  taskCheckbox.checked = task.status === "completed";

  taskCheckbox.addEventListener("change", () => {
    moveTask(task.id, taskCheckbox.checked);
  });

  return taskCheckbox;
}

function createTaskLabel(task) {
  const taskLabel = document.createElement("label");
  taskLabel.textContent = task.description;
  taskLabel.htmlFor = `task-${task.id}`;

  if (task.status === "completed") {
    taskLabel.style.textDecoration = "line-through";
  }

  return taskLabel;
}

function createDeleteTaskButton(task, taskElement) {
  const deleteTaskButton = document.createElement("button");
  deleteTaskButton.classList.add("material-symbols-outlined");
  deleteTaskButton.classList.add("delete-task-button");
  deleteTaskButton.textContent = "delete";

  deleteTaskButton.addEventListener("click", () => {
    deleteTask(task.id, taskElement);
  });

  return deleteTaskButton;
}

function deleteTask(taskId, taskElement) {
  taskElement.animate(
    {
      opacity: 0,
      transform: "translateX(100%)",
    },
    300
  );
  setTimeout(() => {
    tasks.splice(
      tasks.findIndex((t) => t.id === taskId),
      1
    );
    taskElement.remove();
  }, 300);
}

function moveTask(taskId, toEnd) {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return;

  const [task] = tasks.splice(taskIndex, 1);
  task.status = toEnd ? "completed" : "uncompleted";

  if (toEnd) {
    tasks.push(task);
  } else {
    tasks.unshift(task);
  }

  const taskList = document.getElementById("task-list");
  const taskElement = document.getElementById(`task-element-${taskId}`);

  const shouldAnimate =
    !(taskIndex === 0 && !toEnd) && !(taskIndex === tasks.length - 1 && toEnd);

  if (shouldAnimate) {
    taskElement.animate(
      {
        transform: ["translateX(0)", "translateX(-20%)", "translateX(0)"],
      },
      300
    );
  }

  setTimeout(
    () => {
      if (toEnd) {
        taskList.appendChild(taskElement);
      } else {
        taskList.prepend(taskElement);
      }
    },
    shouldAnimate ? 150 : 0
  );

  const taskLabel = taskElement.querySelector("label");
  taskLabel.style.textDecoration = toEnd ? "line-through" : "none";
}
