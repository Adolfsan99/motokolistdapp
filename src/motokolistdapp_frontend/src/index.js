import { motokolistdapp_backend } from "../../declarations/motokolistdapp_backend";


//////////////////////////////////////////////////////////////
///////////////////// JAVASCRIPT /////////////////////////////
//////////////////////////////////////////////////////////////


// DECLARE All homeworks as global variable
let allHomeworks = []; 


// TIMESTAMP Conversions
function formatTimestamp(timestamp) {
const dateObj = new Date(Number(timestamp));
const year = dateObj.getFullYear();
// Months in JavaScript are indexed from 0, so add 1
const month = dateObj.getMonth() + 1; 
const day = dateObj.getDate();
return `${year}-${month}-${day}`;
}


// CREATE Task element
function createTaskElement(task, index) {
const taskElement = document.createElement("div");
taskElement.classList.add("task");

// Format the timestamp to a read data with formatTimestamp
const formattedDate = formatTimestamp(task.dueDate);
// Create the task DOM data for the task
taskElement.innerHTML = `
<p class="t-title">${task.title}</p>
<p class="t-description">${task.description}</p>
<p class="t-time">Date: ${formattedDate}</p>
<p class="t-description">Touch to change the state</p>
<p class="t-id">ID: ${index}</p>
`;
// Save the task DOM data in the respective properties
if (task.completed) {
taskElement.classList.add("task-completed");
} else {
taskElement.classList.add("task-pending");
}
// Switch the state of the task
taskElement.addEventListener("click", async () => {
// Obtain the ID of the task by index
const taskId = index; 
try {
let updatedTask;
if (task.completed) {
// Mark as pending in the backend
await motokolistdapp_backend.markAsPending(taskId); 
// Update the state of the task
updatedTask = { ...task, completed: false };
} else {
// Mark as completed in the backend
await motokolistdapp_backend.markAsCompleted(taskId); 
// Update the state of the task
updatedTask = { ...task, completed: true }; 
}
console.log(`Task with ID ${taskId} has had its state switched.`);
alert(`🔀Changing the status of task ID: ${taskId}...`);
getAllHomeworks();
} catch (error) {
console.error("Error updating task status:", error);
alert("Error updating task status:", error);
}
});
return taskElement;
}


// GET All homeworks
async function getAllHomeworks() {
allHomeworks = await motokolistdapp_backend.getAllHomework();
console.log("All Homeworks:", allHomeworks);
const boxPending = document.querySelector(".box-pending");
const boxCompleted = document.querySelector(".box-completed");

// Clean the content
boxPending.innerHTML = "";
boxCompleted.innerHTML = "";
// Add the index as second argument
allHomeworks.forEach((task, index) => {
// Yse this index in the fuction
const taskElement = createTaskElement(task, index);
if (task.completed) {
boxCompleted.appendChild(taskElement);
} else {
boxPending.appendChild(taskElement);
}
});
}



// ADD Homework
async function addHomework(task) {
const taskId = await motokolistdapp_backend.addHomework(task);
task.id = taskId;
console.log(`Task with ID ${taskId} added successfully.`);
alert(`🆕Adding the task ID: ${taskId}...`);
getAllHomeworks();
return createTaskElement(task, allHomeworks.length);
}



// EDIT Task
async function editTaskById(taskId, newTask) {
try {
await motokolistdapp_backend.updateHomework(taskId, newTask);
console.log(`Task with ID ${taskId} has been editing.`);
alert(`✏️Editing the task ID: ${taskId}...`);
getAllHomeworks();
} catch (error) {
console.error("Error editing task:", error);
alert("Error editing task:", error);
}
}



// DELETE Task
async function deleteTaskById(taskId) {
try {
await motokolistdapp_backend.deleteHomework(taskId);
console.log(`Task with ID ${taskId} deleted successfully.`);
alert(`❌Deleting the task ID: ${taskId}...`);
// Call getAllHomeworks for update the tasks
getAllHomeworks();
} catch (error) {
console.error("Error deleting task:", error);
alert("Error deleting task:", error);
}
}



// SEARCH By text
document.querySelector("#searchForm").addEventListener("submit", async (e) => {
e.preventDefault();
const searchButton = document.querySelector(".b-search");
searchButton.setAttribute("disabled", true);
const searchTerm = document.getElementById("name").value;
if (searchTerm.trim() === "") {
alert("Please enter a search term");
searchButton.removeAttribute("disabled");
return;
}
try {
// Show the div "found" and his content
const foundSection = document.querySelector(".found");
const boxFound = document.querySelector(".box-found");
boxFound.innerHTML = "<h2>Looking for tasks...</h2>";
foundSection.style.display = "block";
const searchResults = await searchHomeworks(searchTerm);
if (searchResults.length === 0) {
boxFound.innerHTML = "<h2>No results found</h2>";
} else {
const resultsHTML = searchResults.map((task, index) => {
const formattedDate = formatTimestamp(task.dueDate);
return `
<div class="task-found">
<p class="t-title">${task.title}</p>
<p class="t-description">${task.description}</p>
<p class="t-time">Date: ${formattedDate}</p>
<p class="t-id">ID: ${index}</p>
</div>
`;
}).join("");
boxFound.innerHTML = resultsHTML;
}
} catch (error) {
console.error("Error searching homeworks:", error);
alert("Error searching homeworks:", error);
}
searchButton.removeAttribute("disabled");
return false;
});




//////////////////////////////////////////////////////////////
///////////////////// D O M //////////////////////////////////
//////////////////////////////////////////////////////////////



// REFRESH button
document.querySelector(".b-update").addEventListener("click", refreshTasks);
function refreshTasks() {
location.reload();
}



// ADD A homework DOM
document.querySelector("#addForm").addEventListener("submit", async (e) => {
e.preventDefault();
const addButton = document.querySelector(".b-create");
addButton.setAttribute("disabled", true);
const title = document.getElementById("f-add-title").value;
const description = document.getElementById("f-add-description").value;
const dateInput = document.getElementById("f-add-time");
const selectedDate = dateInput.value;
const timestamp = Date.parse(selectedDate);
// Verify timestamp
if (isNaN(timestamp)) {
console.error("Invalid date");
alert("Invalid date");
addButton.removeAttribute("disabled");
return;
}
// Validate title length
if (title.length > 63) {
console.error(`Title exceeds maximum length (${title.length}/${64})`);
alert(`⚠️Your title exceeds maximum length (${title.length}/${64})`);
addButton.removeAttribute("disabled");
return;
}
// Validate description length
if (description.length > 127) {
console.error(`Description exceeds maximum length (${description.length}/${128})`);
alert(`⚠️Your description exceeds maximum length (${description.length}/${128})`);
addButton.removeAttribute("disabled");
return;
}
const task = { title: title, 
  description: description, 
  dueDate: timestamp, 
  completed: false };
const taskElement = await addHomework(task);
const boxPending = document.querySelector(".box-pending");
boxPending.appendChild(taskElement);
addButton.removeAttribute("disabled");
// Refresh the list
getAllHomeworks();
return false;
});



// EDIT Task DOM
const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", async (e) => {
e.preventDefault();
const taskId = parseInt(document.getElementById("f-edit-taskId").value, 10);
const title = document.getElementById("f-edit-title").value;
const description = document.getElementById("f-edit-description").value;
const time = document.getElementById("f-edit-time").value;
const dueDate = Date.parse(time);
// Validate title length
if (title.length > 64) {
console.error(`Title exceeds maximum length (${title.length}/${64})`);
alert(`⚠️Your title exceeds maximum length (${title.length}/${64})`);
return;
}
// Validate description length
if (description.length > 128) {
console.error(`Description exceeds maximum length (${description.length}/${128})`);
alert(`⚠️Your description exceeds maximum length (${description.length}/${128})`);
return;
}
if (isNaN(dueDate)) {
console.error("Invalid time");
alert("Invalid time");
return;
}
const task = { title: title,
  description: description,
  dueDate: dueDate,
  completed: false };
editTaskById(taskId, task);
});



// DELETE Task DOM
const deleteForm = document.querySelector("#deleteForm");
deleteForm.addEventListener("submit", async (e) => {
e.preventDefault(); 
const taskId = document.getElementById("f-delete-taskId").value;
if (!isNaN(taskId) && taskId >= 0 && taskId <= allHomeworks.length - 1) {
await deleteTaskById(parseInt(taskId));
document.getElementById("f-delete-taskId").value = "";
} else {
console.error("Searching the task ID. Unable to delete task.");
alert("Searching the task ID. Unable to delete task.");
}});



//SEARCH By text DOM
async function searchHomeworks(searchTerm) {
try {
const searchResults = await motokolistdapp_backend.searchHomework(searchTerm);
console.log("Search Results:", searchResults);
return searchResults;
} catch (error) {
console.error("Error searching homeworks:", error);
throw error;
}
}



// GET All homeworks DOM
window.addEventListener("DOMContentLoaded", async () => {
await getAllHomeworks();
});