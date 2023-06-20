import { User } from "./user.js";
import { Storage } from "./storage.js";
import { UI } from "./UI.js";


const btnAdd=document.querySelector("#btnAdd");
const nameInput=document.querySelector("#nameInput"); 
const surnameInput=document.querySelector("#surnameInput"); 
const cityInput=document.querySelector("#cityInput"); 
const ageInput=document.querySelector("#ageInput"); 


btnAdd.addEventListener("click",(e)=>{
    
if(nameInput.value==""|| surnameInput.value=="" || cityInput.value=="" || ageInput.value==""){
    const message="Lütfen tüm alanları doğru şekilde doldurunuz!"
    UI.showAlert("warning",message);
}
else{
    UI.addUser();
    Storage.saveUserList(User.userList);
    UI.displayUser(User.userList);
    UI.clearInput();
    UI.showAlert("success","Başarılı bir şekilde eklendi")
}
e.preventDefault();
});
   
 document.querySelector(".table").addEventListener("click",(e)=>{
    
    if(e.target.classList.contains("delete")){
        UI.deleteUser(e.target);
        Storage.saveUserList(User.userList);
        e.preventDefault();
    }
})

document.querySelector(".table").addEventListener("click",(e)=>{
    if(e.target.classList.contains("edit")){
        UI.editUser(e.target,User.userList);
    }

});
document.addEventListener('DOMContentLoaded',()=>{
    const data =Storage.getUserList();
    UI.displayUser(data);
});
document.querySelector(".table").addEventListener("click",(e)=>{
    if(e.target.classList.contains("save")){
        UI.saveList(e.target);
        Storage.saveUserList(User.userList);
        UI.showAlert("success","Kaydedildi!")
    }
})
