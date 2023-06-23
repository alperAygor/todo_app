import { Task } from "./task.js";
export class UI{
    constructor(){this.url="https://6492e665428c3d2035d0ddb2.mockapi.io/tasks"}
    
    static getTasks() {
      return fetch(this.url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            UI.showAlert("success", "Başarılı bir şekilde eklendi");
            return response.json();
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .catch((error) => {
          UI.showAlert("danger", "Beklenmeyen bir hata oluştu");
          console.error(error);
        });
    }
    
    static  addTask(newTask){
        fetch(this.url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(data => {
          UI.showAlert("success","Başarılı bir şekilde eklendi")
        })
        .catch(() => {
          UI.showAlert("danger","Beklenmeyen bir hata oluştu")
        });
        
    }
    static  deleteTask(id){
      fetch(this.url+"/"+id,{
        method: 'DELETE'
      
      })
      .then(response => response.json())
      .then(data => {
        UI.showAlert("success","Başarılı bir şekilde silindi")
      })
      .catch(error => {
        UI.showAlert("danger","Beklenmeyen bir hata oluştu")
      });
    }
    static  editTask(updatedTask,id){
      fetch(this.url+"/"+id,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      })
      .then(response => response.json())
      .then(data => {
        UI.showAlert("success","Başarılı bir şekilde güncellendi")
      })
      .catch(() => {
        UI.showAlert("danger","Beklenmeyen bir hata oluştu")
      });
    }
    static showAlert(alertType,message){
        const header=document.querySelector(".header");
        const alert=`<div class="container alert alert-${alertType}">${message}</div>`
        header.insertAdjacentHTML("beforeend",alert);
        setTimeout(()=>{
          const alert=document.querySelector(".alert");  
          alert.remove();
        },2750);
    }
    static displayTask(data){
        console.log(typeof(data));
        const ul = document.querySelector(".list-group");
        ul.innerHTML = "";
    
        data.forEach(task => {
          let li = `<li class="list-group-item d-flex py-3" data-id="${task.id}">
                      <input type="checkbox" class="form-check-input my-auto me-2" >    
                      <h4 class="h4 task-title mx-2 my-auto">${task.title}</h4>
                      <p class="p task-content mx-5 my-auto">
                        ${task.content}
                      </p>  
                      <div class="ms-auto my-auto">
                        <i class="fa-solid fa-pen-to-square btn btn-warning mx-2" id="edit"></i>
                        <i class="fa-solid fa-trash btn btn-danger mx-2" id="delete"></i>
                      </div>  
                    </li>`;
          ul.insertAdjacentHTML("beforeend",li);
        });
      

      } 
      static saveInput(){
        const titleInput=document.querySelector("#titleInput").value;
        const contentInput=document.querySelector("#contentInput").value;
        if(titleInput==="" || contentInput===""){
            UI.showAlert("warning","Lütfen Alanları doğru şekilde doldurunuz!")
    
        }
        else{
            const task=new Task(titleInput,contentInput,false);
             UI.addTask(task.taskObject);
              ul.innerHTML=``;
              addBtn.disabled=false;
        }
      }
    }
