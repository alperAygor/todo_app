import { UI } from "./UI.js";

document.addEventListener("DOMContentLoaded", async () => {
  await UI.init();
});

const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", () => {
  const ul = document.querySelector(".list-group");

  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "py-3");

  const titleInput = document.createElement("input");
  titleInput.classList.add("form-control", "w-25", "mx-2");
  titleInput.id = "titleInput";
  titleInput.type = "text";

  const contentInput = document.createElement("input");
  contentInput.classList.add("form-control", "w-50", "mx-2");
  contentInput.id = "contentInput";
  contentInput.type = "text";

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("btn", "btn-primary", "ms-auto", "me-2");
  saveBtn.id = "saveBtn";
  saveBtn.textContent = "Save";

  li.appendChild(titleInput);
  li.appendChild(contentInput);
  li.appendChild(saveBtn);

  ul.appendChild(li);

  addBtn.disabled = true;

  saveBtn.addEventListener("click", async () => {
    const titleInput = document.querySelector("#titleInput").value;
    const contentInput = document.querySelector("#contentInput").value;

    if (titleInput === "" || contentInput === "") {
      UI.showAlert("warning", "Lütfen alanları doğru şekilde doldurunuz!");
    } else {
      await UI.saveInput("add");
    await UI.init();
    }
  });
});

const ul = document.querySelector(".list-group");

ul.addEventListener("click", async (event) => {
  const target = event.target;
  const row = target.parentElement.parentElement;

  if (target.classList.contains("fa-trash")) {
    const id = row.getAttribute("data-id");
    row.remove();

    try {
      // const response = 
      await fetch(`${UI.url}/${id}`, {
        method: "DELETE"
      });
      // if(!response.ok){throw new error("hata")}
    //   UI.taskList = await response.json();
    //  UI.displayTask();
      UI.showAlert("success", "Başarılı bir şekilde silindi");
    } catch (error) {
      console.error(error);
    }
    await UI.init();
  } else if (target.classList.contains("fa-pen-to-square")) {
    addBtn.disabled = true;
    const id = row.getAttribute("data-id");
    row.innerHTML = "";

    const filteredTask = UI.taskList.find((task) => task.id === id);

    const titleInput = document.createElement("input");
    titleInput.classList.add("form-control", "w-25", "mx-2");
    titleInput.id = "titleInput";
    titleInput.value = filteredTask.taskTitle;

    const contentInput = document.createElement("input");
    contentInput.classList.add("form-control", "w-50", "mx-2");
    contentInput.id = "contentInput";
    contentInput.value = filteredTask.taskContent;

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("btn", "btn-primary", "ms-auto", "me-2");
    saveBtn.id = "saveBtn";
    saveBtn.textContent = "Save";

    row.appendChild(titleInput);
    row.appendChild(contentInput);
    row.appendChild(saveBtn);

    saveBtn.addEventListener("click", async () => {
      const titleInput = document.querySelector("#titleInput").value;
      const contentInput = document.querySelector("#contentInput").value;

      if (titleInput === "" || contentInput === "") {
        UI.showAlert("warning", "Lütfen alanları doğru şekilde doldurunuz!");
      } else {
         await UI.saveInput("edit", id);
        await UI.init();
        }
    });
  }
});
