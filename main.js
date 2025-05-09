const taskInput = document.getElementById("taskInput");
const addTaksBtn = document.getElementById("addTask");
const taskList = document.getElementById("taksList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
    tasksList.innerHTML ="";
    let filterredTasks = taskInput.filter(task => {
        if (currentFilter === "done") return task.done;
        if (currentFilter === "todo") return !task.done;
        return true;
    })

    filteredTasks.forEach((task, index  =>{
    const li = document.createElement("li");
    li.clasneme = task.done ? "done" :"";
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button onclick="toggleDone(${index})">✔️</button>
            <button onclick="deleteTask(${index})">🗑️</button>
        </div>`;
    taskList.appendChild(li);    
}))

localStorage.setItem("tasks", JSON.stringify(tasks));
}

