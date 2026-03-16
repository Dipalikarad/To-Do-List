// Load tasks from local storage on page load
window.onload = function () {
  loadTasks();
};

// Add a new task
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);

  input.value = "";
  renderTasks();
}

// Get tasks from local storage
function getTasksFromStorage() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to local storage
function saveTasksToStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the DOM
function renderTasks() {
  const tasks = getTasksFromStorage();
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? "completed" : "";

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.completed ? "Undo" : "Done";
    toggleBtn.className = "toggle-btn";
    toggleBtn.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(taskText);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Toggle task completion
function toggleTask(index) {
  const tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  renderTasks();
}

// Delete task
function deleteTask(index) {
  const tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  renderTasks();
}

// Load and render tasks initially
function loadTasks() {
  renderTasks();
}
