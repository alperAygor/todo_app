
export class Storage{
    constructor(){}

    static getUserList() {
        const userListJSON = localStorage.getItem('userList');
        return userListJSON ? JSON.parse(userListJSON) : [];

      }
    
      static saveUserList(userList) {
        const userListJSON = JSON.stringify(userList);
        localStorage.setItem('userList', userListJSON);
      }
}