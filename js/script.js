const form = document.getElementById("todo-form");
const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const todoList = document.getElementById("todo-list");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");

let tasks = [];

// Tambah Task
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = taskInput.value.trim();
  const date = dateInput.value;

  // Validasi input
  if (!task) {
    alert("Task name cannot be empty.");
    return;
  }
  if (!date) {
    alert("Please select a due date.");
    return;
  }

  tasks.push({ task, date, status: "pending" });
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
});

// Render Table
function renderTasks(filterDate = "") {
  todoList.innerHTML = "";

  let filtered = tasks;
  if (filterDate) {
    filtered = tasks.filter(t => t.date === filterDate);
  }

  if (filtered.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No task found</td></tr>`;
    return;
  }

  filtered.forEach((t, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.task}</td>
      <td>${t.date}</td>
      <td>
        <span class="status ${t.status}" onclick="toggleStatus(${index})">
          ${t.status.toUpperCase()}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    todoList.appendChild(tr);
  });
}

// Toggle Status
function toggleStatus(index) {
  tasks[index].status = tasks[index].status === "pending" ? "done" : "pending";
  renderTasks();
}

// Delete 1 task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Filter task by tanggal input
filterBtn.addEventListener("click", () => {
  const filterDate = dateInput.value;
  renderTasks(filterDate);
});

// Delete All
deleteAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
});

// First render
renderTasks();
