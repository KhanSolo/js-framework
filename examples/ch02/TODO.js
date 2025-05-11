const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs' ]

const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const TODOlist = document.getElementById('TODO-list')

for (const todo of todos) {
    TODOlist.append(renderTodoInReadMode(todo))
}

addTodoInput.addEventListener('input',() => {
    addTodoButton.disabled = addTodoInput.value.length < 3
})

addTodoInput.addEventListener('keydown', ({ key }) => { 
    if (key === 'Enter' && addTodoInput.value.length >= 3) { 
        addTodo();
    }
})

addTodoButton.addEventListener('click', ()=>{
    addTodo();
})

function renderTodoInReadMode(todo) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = todo;
    span.addEventListener('dblclick', () => {
        const idx = todos.indexOf(todo);
        TODOlist.replaceChild(
            renderTodoInEditMode(todo),
            TODOlist.childNodes[idx]
        )
    });
    li.append(span);

    const button = document.createElement('button');
    button.textContent = 'Done';
    button.addEventListener('click', () => {
        const idx = todos.indexOf(todo);
        removeTodo(idx);
    });
    li.append(button);

    return li;
}

function addTodo() {
    console.log(`addTodo`);
}

function removeTodo() {
    console.log(`removeTodo`);
}

function renderTodoInEditMode(todo) {

}