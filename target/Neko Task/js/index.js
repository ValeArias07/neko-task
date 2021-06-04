const createBtn = document.getElementById('createBtn');
const title = document.getElementById('titleTask');
const description = document.getElementById('descriptionTask');
let todoCanvas = document.getElementById('todo');
let doingCanvas = document.getElementById('doing');
let finishCanvas = document.getElementById('finish');

addTodo=(task)=>{
    let view = new View(task);
    todoCanvas.appendChild(view.renderToDo(task));
}

addTask = () => {

    let xhr = new XMLHttpRequest();
    const task = new Task(0, title.value, description.value, "To-Do", "03-06-2021");
    xhr.open("POST", "http://localhost:8081/Neko_Task_war/api/task/add");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(task));

    addTodo(task);
    const clean = () => {
        document.getElementById('titleTask').value = "";
        document.getElementById('descriptionTask').value = "";
    };
    clean();
}

const getAllToDoTask =()=>{
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState===4){
            let json = xhr.responseText;
            let response= JSON.parse(json);
            console.log(json);
            for(let i=0; i<response.length; i++){
                let taskToDoDTO = response[i];
                let view = new View(taskToDoDTO);
                view.onDeleteTask = () =>{
                    todoCanvas.removeChild(document.getElementById('card'+taskToDoDTO.id));
                };
                view.up = () =>{
                    console.log(todoCanvas.childNodes);
                    todoCanvas.removeChild(document.getElementById('card'+taskToDoDTO.id));
                    doingCanvas.appendChild(view.renderDoing());
                };
                todoCanvas.appendChild(view.renderToDo());
            }
        }
    });
    xhr.open('GET',"http://localhost:8081/Neko_Task_war/api/task/getAllToDo");
    xhr.send();
}

const getAllDoing =()=>{
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState===4){
            let json = xhr.responseText;
            let response= JSON.parse(json);
            for(let i=0; i<response.length; i++){
                let taskToDoDTO = response[i];
                let view = new View(taskToDoDTO);
                view.onDeleteTask = () =>{
                    name ='card'+taskToDoDTO.id;
                    doingCanvas.removeChild(document.getElementById(name));
                };
                view.up = () =>{
                    let componentNew=view.renderFinish();
                    componentNew.id='card'+taskToDoDTO.id;
                    let novalue=document.createElement('div');
                    doingCanvas.replaceChild(novalue,document.getElementById('card'+taskToDoDTO.id));
                    finishCanvas.appendChild(componentNew);
                    console.log(doingCanvas.childNodes);
                };
                view.down = ()=>{
                    let componentNew=view.renderToDo();
                    componentNew.id='card'+taskToDoDTO.id;
                    doingCanvas.removeChild(document.getElementById('card'+taskToDoDTO.id));
                    todoCanvas.appendChild(componentNew);
                };
                doingCanvas.appendChild(view.renderDoing());
            }
        }
    });
    xhr.open('GET',"http://localhost:8081/Neko_Task_war/api/task/getAllDoing");
    xhr.send();
}

const getAllFinish =()=>{
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState===4){
            let json = xhr.responseText;
            console.log(json);
            let response= JSON.parse(json);
            for(let i=0; i<response.length; i++){
                let taskToDoDTO = response[i];
                let view = new View(taskToDoDTO);
                view.onDeleteTask = () =>{
                    name ='card'+taskToDoDTO.id;
                    finishCanvas.removeChild(document.getElementById(name));
                };
                view.down = ()=>{
                    this.taskToDoDTO="Doing";
                    view.reset();
                    doingCanvas.appendChild(view.renderDoing());
                    console.log('card'+taskToDoDTO.id);
                    finishCanvas.removeChild(document.getElementById('card'+taskToDoDTO.id));
                    console.log(finishcanvas.childNodes);
                };
                finishCanvas.appendChild(view.renderFinish());
            }
        }
    });
    xhr.open('GET',"http://localhost:8081/Neko_Task_war/api/task/getAllFinish");
    xhr.send();
}

getAllToDoTask();
getAllDoing();
getAllFinish();
createBtn.addEventListener('click', addTask);