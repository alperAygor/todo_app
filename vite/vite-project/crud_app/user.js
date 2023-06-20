import { Storage } from "./storage.js";
export class User{
    static userList=Storage.getUserList();
    constructor(name ,surname,city,age){
            const userObject={
                id:User.userList.length+1,
                name:name,
                surname:surname,
                city:city,
                age:age}
            User.userList.push(userObject);
    } 
}
  