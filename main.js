const taskInput = document.getElementById("taskInput");
const addTaksBtn = document.getElementById("addTask");
const taskList = document.getElementById("taksList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function renderTasks() {
    tasksList.innerHTML ="";
    let filteredTasks = taskInput.filter(task => {
        if (currentFilter === "done") return task.done;
        if (currentFilter === "todo") return !task.done;
        return true;
    });

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

function addTask(){
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, done: false});
        tasksInput.value = "";
        renderTasks();
    }
}

function toggleDone(index) {
    tasks[index].done =!tasks[index].done;
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
    if(e.key === "enter") addTask()
});
filters.forEach(btn => {
    btn.addEventListener("click",() => {
        filters.forEach(f => f.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

renderTasks();
