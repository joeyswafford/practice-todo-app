// let addNew = document.getElementById("addNew");
let tasks = document.getElementById("tasks");
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let msg = document.getElementById("msg");
let textArea = document.getElementById("textarea");
let add = document.getElementById("add");

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failed");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("Success");
    msg.innerHTML = "";

    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  formValidation();
});

// whatever the user inputs, we need to collect that data and store in local storage.

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    decription: textArea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);

  createTasks();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.decription}</p>

          <span class="options">
            <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
      </div>
      `);
  });
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove(); // deletes the html element from the screen

  data.splice(e.parentElement.parentElement.id, 1); // deletes targeted task from data array

  localStorage.setItem("data", JSON.stringify(data)); // updates local storage with new data

  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement; // targeting selected task and storing in variable.

  textInput.value = selectedTask.children[0].innerHTML; // targeting task value
  dateInput.value = selectedTask.children[1].innerHTML; // targeting date value
  textArea.value = selectedTask.children[2].innerHTML; // targeting description value

  deleteTask(e); // running delete function to remove selected data from local storage, HTML element, and the data array
};

// allows data to persist when page refreshes
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
