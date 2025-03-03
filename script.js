const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

class Task {
    constructor(title, completed = false) {
        this.id = this.id;
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
}
 addTask(title) {
    const id = Date.now().toString();
    const task = new Task(id, title);
    this.tasks.push(task);

    this.saveToLocalStorage();
    this.renderTasks();
    this.updateTaskCount();

 }
 deleteTask(id) {
    this.tasks = this.tasks.filter(task =>task.id !== id);
    this.saveToLocalStorage();
    this.renderTasks();
    this.updateTaskCount();
 }
 
 toggleTask(id) {
    const task = this.tasks.find(this.tasks.find(task => task.id === id));
    if (task) {
        task.completed = !task.completed;
        this.saveToLocalStorage();
        this.updateTaskInDOM(task);
        this.updateTaskCount();

    }
 }

 saveToLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
        this.tasks.forEach(task => this.renderTask(task));

        this.updateTaskCount();
    }
 }

 renderTask(task) {
    const li = document.createElement('li');
    
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

           // Add event listeners
           const checkbox = li.querySelector('input');
           checkbox.addEventListener('change', () => this.toggleTask(task.id));
   
           const deleteBtn = li.querySelector('.delete-btn');
           deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
   
           // Add to list
           todoList.appendChild(li);
       }
   }
   
   // 4. Create TodoList instance
   const todoApp = new TodoList();
   
   // 5. Event Listeners
   todoForm.addEventListener('submit', (e) => {
       e.preventDefault();  // Prevent form submission
       const todoText = todoInput.value.trim();  // Get input value
       
       if (todoText) {  // If input is not empty
           todoApp.addTask(todoText);  // Add new task
           todoInput.value = '';       // Clear input
       }
   });