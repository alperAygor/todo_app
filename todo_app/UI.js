export class UI {
  static url = "https://6492e665428c3d2035d0ddb2.mockapi.io/tasks";
  static taskList = [];

  static showAlert(alertType, message) {
    const header = document.querySelector(".header");
    const alert = document.createElement("div");
    alert.classList=`container alert-${alertType}`;
    alert.textContent = message;
    header.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 2750);
  }

  static  displayTask() {
      const ul = document.querySelector(".list-group");
      ul.innerHTML = "";
      console.log(Array.isArray(this.taskList)); // true

      this.taskList.forEach((task) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "py-3");
      li.setAttribute("data-id", task.id);

      const h4 = document.createElement("h4");
      h4.classList.add("h4", "task-title", "mx-2", "my-auto");
      h4.textContent = task.taskTitle;

      const p = document.createElement("p");
      p.classList.add("p", "task-content", "mx-5", "my-auto");
      p.textContent = task.taskContent;

      const div = document.createElement("div");
      div.classList.add("my-auto", "ms-auto");

      const editIcon = document.createElement("i");
      editIcon.classList.add("fa-solid", "fa-pen-to-square", "btn", "btn-warning", "mx-2", "ms-auto");
      editIcon.id = "edit";

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash", "btn", "btn-danger", "mx-2", "ms-auto");
      deleteIcon.id = "delete";

      div.appendChild(editIcon);
      div.appendChild(deleteIcon);

      li.appendChild(h4);
      li.appendChild(p);
      li.appendChild(div);

      ul.appendChild(li);
    });
  }

  static async saveInput(type, id) {
    const addBtn = document.querySelector("#addBtn");
    const titleInput = document.querySelector("#titleInput").value;
    const contentInput = document.querySelector("#contentInput").value;

    if (type === "edit") {
      const updatedTask = {
        taskTitle: titleInput,
        taskContent: contentInput
      };

      try {
        // const response = 
        await fetch(`${UI.url}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedTask)
        });
        // if(!response.ok){throw new error("hata")}
        // this.taskList = await response.json();
        //  UI.displayTask();
        UI.showAlert("success", "Başarılı bir şekilde güncellendi");
      } catch (error) {
        console.error(error);
      }
    } else {
      const newTask = {
        taskTitle: titleInput,
        taskContent: contentInput
      };

      try {
        // const response = 
        await fetch(UI.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        });
        // if(!response.ok){throw new error("hata")}
      //   this.taskList = await response.json();
      //  UI.displayTask();
        UI.showAlert("success", "Başarılı bir şekilde eklendi");
      } catch (error) {
        console.error(error);
      }
    }

    addBtn.disabled = false;
  }

  static async init() {
    try {
      const response = await fetch(UI.url);
      this.taskList = await response.json();
     UI.displayTask();
    } catch (error) {
      console.error(error);
    }
  }
}
