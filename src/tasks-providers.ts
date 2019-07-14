import { Observable } from "rxjs";
import { Tasks } from "./tasks";

export interface TaskInterface {
    id: string;
    name: string;
    status: string;
    prority: number;
    error: boolean;
    errorAnswear?: string;
}


export class TasksService {
    static status (value: string): boolean {
        const table = ['new', 'done', 'delete'];
        if (table.indexOf(value) != -1) {
            return true
        } else return false
    };
    
    tasks = new Tasks();
    addNewTask(tasks: TaskInterface[], task: TaskInterface): void {
        if (task.error === false){
            tasks.map(el => {
                if (el.id != task.id) {
                    tasks.push(task)
                }
            }) 
            let cList: any;
            if (task.status === 'new') {
                cList = document.getElementById("listNew");
            } else if (task.status === 'done') {
                cList = document.getElementById('listDone');
            } else if (task.status === 'delete') {
                cList = document.getElementById('listRemove')
            }
            TasksService.renderTask(task).subscribe(
                ((el: any) => {
                    cList.appendChild(this.tasks.createTasks(el));
                }),
                ( error: any) => console.log(error) ),
                () => console.log('Ok!')
            
        } else alert(task.errorAnswear)
        
    }
    static renderTasks(tasks: TaskInterface[]): Observable<TaskInterface[]> {
        return Observable.create((observer: any) => {
            tasks.map((task: TaskInterface) => observer.next(task))
        })
    }
    static renderTask(task: TaskInterface): Observable<TaskInterface> {
        return Observable.create((observer: any) => observer.next(task));
    }
}