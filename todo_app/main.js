import { UI } from "./UI.js";
const li = document.querySelector(".list-group-item");
const addBtn = document.querySelector("#addBtn");
const ul = document.querySelector(".list-group");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await UI.getTasks();
        UI.displayTask(data);
      } catch (error) {
        console.error(error);
      }
    });

addBtn.addEventListener("click", (e) => {
  const li = `<li class="list-group-item d-flex py-3">
                <input type="text" class="form-control w-25 mx-2" id="titleInput">
                <input type="text" class="form-control w-50 mx-2" id="contentInput">
                <button class="btn btn-primary ms-auto me-2" id="saveBtn">Save</button>
            </li>`;
  ul.insertAdjacentHTML("beforeend", li);
  addBtn.disabled = true;
  
  document.querySelector("#saveBtn").addEventListener("click", async (e) => {
    UI.saveInput();
    const data = await UI.getTasks();
    UI.displayTask(data);
    e.preventDefault();
  });

  e.preventDefault();
});

ul.addEventListener("click", async (e) => {
  const row = e.target.parentElement;
  
  if (e.target.classList.contains("fa-trash")) {
    const id = row.getAttribute("data-id");
    row.remove();
    UI.deleteTask(id);
    const data = await UI.getTasks();
    UI.displayTask(data);
  } else if (e.target.classList.contains("fa-pen-to-square")) {
    addBtn.disabled = true;
    const id = row.getAttribute("data-id");
    row.innerHTML = "";
    const data = await UI.getTasks();
    const filteredTask = data.find((task) => task.id === id);
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    const button = document.createElement("button");
    input1.classList = "form-control w-25 mx-2";
    input2.classList = "form-control w-25 mx-2";
    input1.id = "titleInput";
    input2.id = "contentInput";
    input1.value = filteredTask.title;
    input2.value = filteredTask.content;
    button.classList = "btn btn-primary ms-auto me-2";
    button.textContent = "Save";
    button.id = "saveBtn";
    row.appendChild(input1);
    row.appendChild(input2);
    row.appendChild(button);
    
    document.querySelector("#saveBtn").addEventListener("click", async (e) => {
      UI.saveInput();
      const data = await UI.getTasks();
      UI.displayTask(data);
      e.preventDefault();
    });
  }
});
