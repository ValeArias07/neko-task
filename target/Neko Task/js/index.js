const createBtn = document.getElementById('createBtn');
const title = document.getElementById('titleTask');
const description = document.getElementById('descriptionTask');
let todoCanvas = document.getElementById('todo');
let doingCanvas = document.getElementById('doing');
let finishCanvas = document.getElementById('finish');
let todoContainer = document.getElementById('todoContainer');
let doingContainer = document.getElementById('doingContainer');
let doneContainer= document.getElementById('doneContainer');

addTask = () => {

    let xhr = new XMLHttpRequest();
    const task = new Task(0, title.value, description.value, "To-Do", "03-06-2021");
    xhr.open("POST", "http://localhost:8081/Neko_Task_war/api/task/add");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(task));
    let view = new View(task);
    todoCanvas.appendChild(view.renderToDo(task));

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
            for(let i=0; i<response.length; i++){
                let taskToDoDTO = response[i];
                let view = new View(taskToDoDTO);
                view.onDeleteTask = () =>{

                    todoCanvas.removeChild(document.getElementById('card'+taskToDoDTO.id));
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
            let response= JSON.parse(json);
            for(let i=0; i<response.length; i++){
                let taskToDoDTO = response[i];
                let view = new View(taskToDoDTO);
                view.onDeleteTask = () =>{
                    name ='card'+taskToDoDTO.id;
                    finishCanvas.removeChild(document.getElementById(name));
                };
                finishCanvas.appendChild(view.renderFinish());
            }
        }
    });
    xhr.open('GET',"http://localhost:8081/Neko_Task_war/api/task/getAllFinish");
    xhr.send();
}

todoContainer.addEventListener('dragover', (e)=>{
    e.preventDefault();
});

doingContainer.addEventListener('dragover', (e)=>{
    e.preventDefault();
});

doneContainer.addEventListener('dragover', (e)=>{
    e.preventDefault();
});

todoContainer.addEventListener('drop', (e)=>{
    e.preventDefault();
    let newTask = JSON.parse(e.dataTransfer.getData('task'));
    if(newTask.category === 'Finish'){
        finishCanvas.removeChild(document.getElementById('card'+newTask.id));
    }else if(newTask.category === 'Doing'){
        doingCanvas.removeChild(document.getElementById('card'+newTask.id));
    }
    newTask.category="To-Do";
    let view = new View(newTask);
    view.updateType(newTask);
    todoCanvas.appendChild(view.renderToDo());
});


doingContainer.addEventListener('drop', (e)=>{
    e.preventDefault();
    let newTask = JSON.parse(e.dataTransfer.getData('task'));
    if(newTask.category === 'To-Do'){
        todoCanvas.removeChild(document.getElementById('card'+newTask.id));
    }else if(newTask.category === 'Finish'){
        finishCanvas.removeChild(document.getElementById('card'+newTask.id));
    }
    newTask.category="Doing";
    let view = new View(newTask);
    view.updateType(newTask);
    doingCanvas.appendChild(view.renderDoing());
});

doneContainer.addEventListener('drop', (e)=>{
    e.preventDefault();
    let newTask = JSON.parse(e.dataTransfer.getData('task'));
    if(newTask.category === 'To-Do'){
        todoCanvas.removeChild(document.getElementById('card'+newTask.id));
    }else if(newTask.category === 'Doing'){
        doingCanvas.removeChild(document.getElementById('card'+newTask.id));
    }
    newTask.category="Finish";
    let view = new View(newTask);
    view.updateType(newTask);
    finishCanvas.appendChild(view.renderFinish());
});

getAllToDoTask();
getAllDoing();
getAllFinish();
createBtn.addEventListener('click', addTask);