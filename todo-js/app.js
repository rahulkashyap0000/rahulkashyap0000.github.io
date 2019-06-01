// Define UI Vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();
// Load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear tasks event
    clearBtn.addEventListener("click", clearTasks);
    // filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        // Create li
        const li = document.createElement("li");
        // li class="collection-item"
        li.className = "collection-item";
        // <li>taskInput</li>
        li.appendChild(document.createTextNode(task));
        // Create a new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    e.preventDefault();
    // If nothing added
    if (taskInput.value === "") {
        alert("Add a task");
    } else {
        // Create li
        const li = document.createElement("li");
        // li class="collection-item"
        li.className = "collection-item";
        // <li>taskInput</li>
        li.appendChild(document.createTextNode(taskInput.value));
        // Create a new link element
        const link = document.createElement("a");
        // Add class
        link.className = "delete-item secondary-content";
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);
    }
    //Clear input
    taskInput.value = "";
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            // Remove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
    if (confirm("Are you sure?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }

        // Clear Tasks from Local Storage
        clearTasksFromLocalStorage();
    }
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}