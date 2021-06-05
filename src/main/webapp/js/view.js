class View{

    constructor(task){
        this.task=task;
        this.onDeleteTask = null;
    }

    deleteTask=()=>{
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange' , ()=>{
            if(xhr.readyState ===4 ){
                if(this.onDeleteTask!==null) this.onDeleteTask();
            }
        });
        xhr.open('DELETE','http://localhost:8081/Neko_Task_war/api/task/delete/'+this.task.id);
        xhr.send();
    }

    updateType=(task)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('PUT',"http://localhost:8081/Neko_Task_war/api/task/update");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(this.task));
    }

    renderToDo =()=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML="X";

        component.appendChild(btnContainer);

        let properties = '<div> <p class="titleCard">'+this.task.title+'</p>\n' +
            '                <p class="textType"> Descripcion: '+this.task.description+'</p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;
        btnContainer.appendChild(eraseBtn);
        component.appendChild(propertiesContainer);
        eraseBtn.addEventListener('click', this.deleteTask);
        component.draggable = true;
        component.addEventListener('dragstart', e => {
            e.dataTransfer.setData('task', JSON.stringify(this.task));
        });
        return component;
    }

    renderDoing =()=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML="X";

        btnContainer.appendChild(eraseBtn);
        component.appendChild(btnContainer);

        let properties = '<div> <p class="titleCard">'+this.task.title+'</p>\n' +
            '                <p class="textType"> Descripcion: '+this.task.description+'</p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;
        component.appendChild(propertiesContainer);
        eraseBtn.addEventListener('click', this.deleteTask);
        component.draggable = true;
        component.addEventListener('dragstart', e => {
            e.dataTransfer.setData('task', JSON.stringify(this.task));
        });
        return component;
    }

    renderFinish =()=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML="X";

        btnContainer.appendChild(eraseBtn);

        let properties = '<div> <p class="titleCard">'+this.task.title+'</p>\n' +
            '                <p class="textType"> Descripcion: '+this.task.description+'</p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;

        component.appendChild(btnContainer);
        component.appendChild(propertiesContainer);

        eraseBtn.addEventListener('click', this.deleteTask);
        component.draggable = true;

        component.addEventListener('dragstart', e => {
           e.dataTransfer.setData('task', JSON.stringify(this.task));
           e.dataTransfer.setData('card',  JSON.stringify(component));
        });

        return component;
    }
}