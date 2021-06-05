class Task {

    constructor(id, title, description, category, date) {
        const time = Date.now();
        const today = new Date(time);
        this.id=id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.date =  today.toLocaleDateString();

    }
}