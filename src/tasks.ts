import { TaskInterface, TasksService } from "./tasks-providers";


export class Tasks {
    
    tasks: TaskInterface[] = [
        {
            id: 'task-1',
            name: 'Zadanie 1',
            status: 'new',
            prority: 1,
            error: false
        }
    ];
    tableTaskOption: Array<any> = [
        {   
            list: 'newList',
            status: 'new', 
            valueButton: 'N'
        }, 
        {
            list: 'doneList',
            status: 'done', 
            valueButton: '<i class="far fa-check-square"></i>'
        }, 
        {
            list: 'removeList',
            status: 'delete', 
            valueButton: '<i class="fas fa-trash"></i>'
        }
    ];

    constructor() {
    }

    getFormGroupValues (tasks: TaskInterface[]): TaskInterface {
        const taskFormGroup = (): TaskInterface => {
            const formTaskName$ = (<HTMLInputElement>document.getElementById('formTaskName')).value;
            const formTaskStatus$ = (<HTMLInputElement>document.querySelector('#formTaskStatus')).value;
            const formTaskPriority$ = (<HTMLInputElement>document.querySelector('#formTaskPriority')).value;
            const id: number = parseInt(tasks[tasks.length-1].id.slice(5, tasks[tasks.length-1].id.length));
            const taskId: string = 'task-' + (id + 1).toString();
            const task: TaskInterface = {
                id: taskId,
                name: formTaskName$,
                status: formTaskStatus$,
                prority: parseInt(formTaskPriority$),
                error: false
            };
            return task;
        };
        if (TasksService.status(taskFormGroup().status)) { 
            return taskFormGroup() 
        } else {
            const task = taskFormGroup();
            task.error = true;
            task.errorAnswear = `Taki status zadania nie istnieje:  ${task.status}
Dostępne statusy zadania: new || done || delete`;
            return task
        };
    };

    createTasks (el1: any): HTMLElement {
                const el = el1 as TaskInterface;
                const cLi = document.createElement('li');
                cLi.id = el.id;
                cLi.setAttribute('task', 'true')
                cLi.setAttribute('priority', `${el.prority}`);
                cLi.setAttribute('status', `${el.status}`);
                cLi.innerHTML = `<span>${el.status}</span><h2>${el.name}</h2>${this.taskOption(el, this.tableTaskOption).outerHTML}`;
                return cLi;
    };

    moveTask (status: string, task: any, tasks: TaskInterface[], tableTaskOption: Array<any>) {
        tableTaskOption.map(option => {
            if (option.status === status) {
                const id: string = (<HTMLElement>task).getAttribute('id');
                let selectTask: TaskInterface; 
                tasks.map( task => {
                    if (task.id === id) selectTask = task;
                }); 
                const tasksService = new TasksService();
                (<HTMLElement>task).setAttribute('status', `${status}`);
                (<HTMLElement>task).getElementsByTagName('ul')[0].innerHTML = `${this.taskOption(selectTask, this.tableTaskOption).innerHTML}`
                selectTask.status = status;
                (<HTMLElement>task).parentElement.removeChild((<HTMLElement>task))
                tasksService.addNewTask(tasks, selectTask);
            }
        })
    }

    taskOption = (el: TaskInterface, tableTaskOption: Array<any>) => {
        const cTaskOptions  = (<HTMLUListElement>document.createElement('ul'));
        cTaskOptions.setAttribute('id', 'listOptionStatus');
        tableTaskOption.map(option => {
            if (option.status !== el.status) {
                const cTaskOption = document.createElement('li');
                cTaskOption.setAttribute('optionStatus', `${option.status}`);
                cTaskOption.innerHTML = `${option.valueButton}`;
                cTaskOptions.innerHTML += cTaskOption.outerHTML;
            }
        })
        return cTaskOptions;
    };
};