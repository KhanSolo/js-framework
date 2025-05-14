const todos = [
  { description: 'Walk the dog', done: false },
  { description: 'Water the plants', done: false },
  { description: 'Sand the chairs', done: false },
]

const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const todosList = document.getElementById('TODO-list')

for (const todo of todos) {
    todosList.append(renderTodoInReadMode(todo))
}

addTodoInput.addEventListener('input',() => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener('keydown', ({ key }) => { 
    if (key === 'Enter' && addTodoInput.value.length >= 3) { 
        addTodo();
    }
})

addTodoButton.addEventListener('click', () => { addTodo(); })

function renderTodoInReadMode(todo) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = todo.description;

    if (todo.done) { 
        span.classList.add(`done`);
    }
    else{
        span.addEventListener('dblclick', () => { // -> edit
            const idx = todos.indexOf(todo);
            todosList.replaceChild(
                renderTodoInEditMode(todo),
                todosList.childNodes[idx]
            )
        });
    }
    li.append(span);

    if (!todo.done) {
        const button = document.createElement('button');
        button.textContent = 'Done';
        button.addEventListener('click', () => {
            const idx = todos.indexOf(todo);
            removeTodo(idx);
            todosList.replaceChild(
                renderTodoInReadMode(todo),
                todosList.childNodes[idx]
            )
        });
        li.append(button);
    }

    return li;
}

function renderTodoInEditMode(todo) {
    const li = document.createElement('li');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.description;
    li.append(input);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        updateTodo(idx, input.value);
    });
    li.append(saveButton);

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        todosList.replaceChild(
            renderTodoInReadMode(todo),
            todosList.childNodes[idx]
        )
    });
    li.append(cancelButton);

    return li;
}

function addTodo() {
    const description = addTodoInput.value;

    if (todoExists(description)){
        alert('Todo already exists');
        return;
    }

    const newTodo = { description:description, done:false };
    todos.push(newTodo);
    todosList.append(renderTodoInReadMode(newTodo))
    addTodoInput.value = ``;
    addTodoButton.disabled = true;
    readTodo(description)
}

function readTodo(description) {
    const message = new SpeechSynthesisUtterance()
    message.text = description
    message.voice = speechSynthesis.getVoices()[0]
    speechSynthesis.speak(message)
}

function todoExists(description) {
    const cleanTodos = todos.map((todo) => todo.description.trim().toLowerCase())
    return cleanTodos.includes(description.trim().toLowerCase())
}

function updateTodo(idx, description) {
    const newTodo = { description:description, done:false };
    todos[idx] = newTodo;
    todosList.replaceChild(
        renderTodoInReadMode(newTodo),
        todosList.childNodes[idx])
}

function removeTodo(idx) { todos[idx].done = true; }
