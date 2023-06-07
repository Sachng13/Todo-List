let tasks = [];
const taskList = document.getElementById("list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskCounter = document.getElementById("task-counter");
const incompleteTasks=document.getElementById("incomplete-task-counter");
const completeTasks=document.getElementById("complete-task-counter");

// Adding task in tasks Array;
function addTask(task) {
    if (task){
        tasks.push(task);
        renderList();
        showNotification("Task added succesfully");
        return ;
    }
    showNotification("Task cannot be added");
   }

// deleting task from the array;

function deleteTask(taskId) {
    const newTasks=tasks.filter(function(task){
        return task.id != taskId;
    })

    tasks = newTasks;

     renderList();
    showNotification("Task deleted succesfully");
    return;
    };

// rendering the list;

function renderList() { 
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        addTaskToDOM(tasks[i]);
    }
    taskCounter.innerHTML = tasks.length;
    const it = tasks.filter(function(task){
        return !task.done
    })
    incompleteTasks.innerHTML = it.length;

    const ct = tasks.filter(function(task){
        return task.done
    })
     completeTasks.innerHTML = ct.length;


};

// Toggling the task;

function toggleTask(taskId) { 
    const newTasks=tasks.filter(function(task){
        return task.id == taskId;
    })
    if (newTasks.length>0){
        const currentTask=newTasks[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("task toggeled succesfully");
        return;
    }
    showNotification("could not toggele the task");
     
};

// showing Notification;

function showNotification(notificationText) {
    alert(notificationText);
}


// Getting the task typed from dom;

function taskGetter() {
    const taskText = taskInput.value;
    if (!taskText) {
        showNotification("Task text cannot be empty");
        return;
    }
    const task = {
        text: taskText,
        id: Date.now().toString(),
        done: false,
    }

    console.log(task.id);
    taskInput.value = "";
    addTask(task);


}

// Adding task to DOM;
function addTaskToDOM(task) {
    const li = document.createElement("li");

    li.innerHTML = `
  <input type="checkbox" id="${task.id}" ${task.done ? "checked" : "" } class="custom-checkbox" >
  <label for="${task.id}">${task.text}</label>
  <img src="bin.png" class="delete" data-id= "${task.id}" />
`;

taskList.append(li);
}


//Event handlings;
function eventHandlers(){
    addTaskBtn.addEventListener("click", taskGetter);
    document.addEventListener("click",toggleAndDelete);
}

eventHandlers();


function toggleAndDelete(e){
    const target=e.target;
    if (target.className=="delete"){
        const deleteID=target.dataset.id;
        deleteTask(deleteID);
        return ;
    }

    if (target.className=="custom-checkbox"){
        const toggleId=target.id;
        toggleTask(toggleId);
        return ;
    }
}




