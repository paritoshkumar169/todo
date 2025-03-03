const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
class Task {
    constructor(id, title, completed = false) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.createdAt = new Date();
    }
}

class TodoList {
    constructor() {
        this.tasks = [];
        this.loadFromLocalStorage();
    }
    addTask(title) {
        const id = Date.now().toString();
        const task = new Task(id, title);
        this.tasks.push(task);

        this.saveToLocalStorage();
        this.renderTask(task);
        this.updateTaskCount();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToLocalStorage();
        this.removeTaskFromDOM(id);
        this.updateTaskCount();
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToLocalStorage();
            this.updateTaskInDOM(task);
            this.updateTaskCount();
        }
    }
    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadFromLocalStorage() {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.tasks.forEach(task => this.renderTask(task));
            this.updateTaskCount();
        }
    }

    renderTask(task) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <div class="todo-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span>${task.title}</span>
            </div>
            <div class="todo-actions">
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', () => this.toggleTask(task.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        todoList.appendChild(li);
    }

    updateTaskCount() {
        totalTasks.textContent = this.tasks.length;
        completedTasks.textContent = this.tasks.filter(task => task.completed).length;
    }

    removeTaskFromDOM(id) {
        const li = document.querySelector(`li[data-id="${id}"]`);
        if (li) {
            li.remove();
        }
    }
    updateTaskInDOM(task) {
        const li = document.querySelector(`li[data-id="${task.id}"]`);
        if (li) {
            const checkbox = li.querySelector('input');
            checkbox.checked = task.completed;
        }
    }
}

const todoApp = new TodoList();

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText) {
        todoApp.addTask(todoText);
        todoInput.value = '';
    }
});
