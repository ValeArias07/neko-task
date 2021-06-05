class View{

    constructor(task){
        this.task=task;
        this.onDeleteTask = null;
        this.component = null;
        const time = Date.now();
        const today = new Date(time);
        this.date= today.toLocaleDateString();

    }

    deleteTask=()=>{
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange' , ()=>{
            if(xhr.readyState ===4 ) {
                if (this.component !== null) {
                this.component.removeChild(document.getElementById('card'+this.task.id));
                 }
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

    renderToDo =(componentMajor)=>{

        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML='<img src="images/paw.png" id="paw">';

        component.appendChild(btnContainer);

        let properties = '<div> <p class="titleCardToDo">'+this.task.title+'</p>\n' +
            '                <p class="descriptionText"> Descripcion:\n'+'<p class="textType">'+this.task.description+'</p></p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';



        propertiesContainer.innerHTML=properties;
        btnContainer.appendChild(eraseBtn);
        component.appendChild(propertiesContainer);
        eraseBtn.addEventListener('click', this.deleteTask);
        component.draggable = true;
        component.addEventListener('dragstart', e => {
            e.dataTransfer.setData('task', JSON.stringify(this.task));
        });
        this.component=componentMajor;
        return component;
    }

    renderDoing =(componentMajor)=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML='<img src="images/paw.png" id="paw">';

        btnContainer.appendChild(eraseBtn);
        component.appendChild(btnContainer);

        let properties = '<div> <p class="titleCardDoing">'+this.task.title+'</p>\n' +
            '                <p class="descriptionText"> Descripcion:\n'+'<p class="textType">'+this.task.description+'</p></p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;
        component.appendChild(propertiesContainer);
        eraseBtn.addEventListener('click', this.deleteTask);
        component.draggable = true;
        component.addEventListener('dragstart', e => {
            e.dataTransfer.setData('task', JSON.stringify(this.task));
        });
        this.component=componentMajor;
        return component;
    }

    renderFinish =(componentMajor)=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML='<img src="images/paw.png" id="paw">';

        btnContainer.appendChild(eraseBtn);

        let properties = '<div> <p class="titleCardFinish">'+this.task.title+'</p>\n' +
            '                <p class="descriptionText"> Descripcion:\n'+'<p class="textType">'+this.task.description+'</p></p>\n' +
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
        this.component=componentMajor;
        return component;
    }
}