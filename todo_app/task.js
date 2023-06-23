export class  Task{
    taskObject={};
    constructor(title,content,completed=false){
        title=this.title;
        content=this.content;
        completed=this.completed
        this.taskObject={
            title:this.title,
            content:this.content,
            completed:this.completed
        }
    }

}