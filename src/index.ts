import './css/main.css';



import { TasksService, TaskInterface } from "./tasks-providers";
import { Tasks } from './tasks';

const tasks = new Tasks();
const tasksService = new TasksService();
TasksService.renderTasks(tasks.tasks).subscribe(
    ((el: TaskInterface[]) => {
        document.getElementById('listNew').appendChild(tasks.createTasks(el))
}),
    ( error: any) => console.log(error) ),
    () => console.log('Ok!')


const newTask = (e: Event) => {
    e.preventDefault();
    tasksService.addNewTask(tasks.tasks, tasks.getFormGroupValues(tasks.tasks))
    if (tasksService.tasksError) {
        alert('Nie dodano zadania!');
    } else {
        alert('Dodano zadanie!');
    }
}
document.getElementById('addNewTaskButton').addEventListener('click', newTask)

const showList = (e: Event) => {
    e.preventDefault();
    const elSection =  (<HTMLElement>e.target).getAttribute('section');
    const changeDisplay = () => {
        const arraySection: Array<any> = [{status: 'new', className: 'cNew'}, {status: 'done', className: 'cDone'}, {status: 'delete', className: 'cRemove'}];
        if (elSection === 'addNewTask') {
            document.querySelector(`.cFormNewTask`).classList.remove('noDisplay');
            document.querySelector(`.cFormNewTask`).classList.add('yesDisplay');
            arraySection.map(el => {
                document.querySelector(`.${el.className}`).classList.add('noDisplay');
                document.querySelector(`.${el.className}`).classList.remove('yesDisplay');
            })
        } else arraySection.map(el => {
            document.querySelector(`.cFormNewTask`).classList.remove('yesDisplay');
            document.querySelector(`.cFormNewTask`).classList.add('noDisplay');
            if (el.status !== elSection) {
                document.querySelector(`.${el.className}`).classList.remove('yesDisplay');
                document.querySelector(`.${el.className}`).classList.add('noDisplay');
                
            } else {
                document.querySelector(`.${el.className}`).classList.remove('noDisplay');
                document.querySelector(`.${el.className}`).classList.add('yesDisplay');
            }

        })
    };
    changeDisplay();
    

} 

document.getElementById('listsNavigation').addEventListener('click', showList, false);

const getTask = (e: Event) => {
    const elAtr = (<HTMLElement>e.target);
    if (elAtr.getAttribute('task') === 'true') {
        return (<HTMLElement>e.target).id;
    } else if (elAtr.parentElement.getAttribute('task') === 'task') {
        return (<HTMLElement>e.target).parentElement.id;
    }
}

document.getElementById('tasksLists').addEventListener('click', getTask, false);

const getTaskSelectOption = (e: Event) => {
    const elAtr = (<HTMLElement>e.target).parentElement.getAttribute('id');
    const elAtr1 = (<HTMLElement>e.target).parentElement.parentElement.getAttribute('id');
    if (elAtr === 'listOptionStatus') {
        const task = (<HTMLElement>e.target).parentElement.parentElement;
        console.log(task);
        const status: string = (<HTMLElement>e.target).getAttribute('optionStatus');
        tasks.moveTask(status, task, tasks.tasks, tasks.tableTaskOption);
    } else if (elAtr1 === 'listOptionStatus' ) {
        const task = (<HTMLElement>e.target).parentElement.parentElement.parentElement;
        console.log(task);
        const status: string = (<HTMLElement>e.target).parentElement.getAttribute('optionStatus');
        tasks.moveTask(status, task, tasks.tasks, tasks.tableTaskOption);
    }
}

document.getElementById('tasksLists').addEventListener('click', getTaskSelectOption, false);