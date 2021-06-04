class View{

    constructor(task){
        this.task=task;
        this.onDeleteTask = null;
        this.up = null;
        this.down = null;
    }

    reset=()=>{

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

    upCategory=()=>{

        if(this.task.category === "To-Do"){
            this.task.category = "Doing";
        }else if(this.task.category === "Doing"){
            this.task.category = "Finish";
        }

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', ()=>{
            if(xhr.readyState===4){
                if(this.up!==null) {
                    this.up();

                }
            }
        });
        xhr.open('PUT',"http://localhost:8081/Neko_Task_war/api/task/update");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(this.task));
    }

    downCategory=()=>{

        if(this.task.category === "Doing"){
            this.task.category = "To-Do";
        }else if(this.task.category === "Finish"){
            this.task.category = "Doing";
        }

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', ()=>{
            if(xhr.readyState===4){
                if(this.down!==null) this.down();
            }
        });
        xhr.open('PUT',"http://localhost:8081/Neko_Task_war/api/task/update");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(this.task));
    }

    renderToDo =()=>{

        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let btnContainer2 = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let upBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML="X";
        upBtn.className ='upBtn'; upBtn.id='upBtnToDo';

        component.appendChild(btnContainer);
        btnContainer2.appendChild(upBtn);

        let properties = '<div> <p class="titleCard">'+this.task.title+'</p>\n' +
            '                <p class="textType"> Descripcion: '+this.task.description+'</p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;

        btnContainer.appendChild(eraseBtn);
        component.appendChild(propertiesContainer);
        component.appendChild(btnContainer2);

        eraseBtn.addEventListener('click', this.deleteTask);
        upBtn.addEventListener('click', this.upCategory);

        return component;
    }

    renderDoing =()=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let btnContainer2 = document.createElement('div');
        let eraseBtn = document.createElement('button');
        let upBtn = document.createElement('button');
        let downBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML="X";

        upBtn.className ='upBtn';
        downBtn.className ='downBtn';

        btnContainer.appendChild(eraseBtn);
        btnContainer2.appendChild(downBtn);
        btnContainer2.appendChild(upBtn);
        component.appendChild(btnContainer);

        let properties = '<div> <p class="titleCard">'+this.task.title+'</p>\n' +
            '                <p class="textType"> Descripcion: '+this.task.description+'</p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;

        component.appendChild(propertiesContainer);
        component.appendChild(btnContainer2);

        eraseBtn.addEventListener('click', this.deleteTask);
        upBtn.addEventListener('click', this.upCategory);
        downBtn.addEventListener('click', this.downCategory);

        return component;
    }

    renderFinish =()=>{
        let component = document.createElement('div');
        let btnContainer = document.createElement('div');
        let btnContainer2 = document.createElement('div');
        let eraseBtn = document.createElement('button');

        let downBtn = document.createElement('button');
        let propertiesContainer= document.createElement('div');

        component.className = 'card'; component.id='card'+this.task.id;
        eraseBtn.className ='eraseBtn'; eraseBtn.innerHTML="X";
        downBtn.className ='downBtn'; downBtn.id='downBtnDone';

        btnContainer.appendChild(eraseBtn);
        btnContainer2.appendChild(downBtn);


        let properties = '<div> <p class="titleCard">'+this.task.title+'</p>\n' +
            '                <p class="textType"> Descripcion: '+this.task.description+'</p>\n' +
            '                <p class="dateText">'+this.task.date+'</p> </div>';

        propertiesContainer.innerHTML=properties;

        component.appendChild(btnContainer);
        component.appendChild(propertiesContainer);
        component.appendChild(btnContainer2);

        eraseBtn.addEventListener('click', this.deleteTask);
        downBtn.addEventListener('click', this.downCategory);

        return component;
    }
}