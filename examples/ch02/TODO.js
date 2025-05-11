const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs' ]

const addTodoInput = document.getElementById('todo-input')
const addTodoButton = document.getElementById('add-todo-btn')
const TODOlist = document.getElementById('TODO-list')

for (const todo in todos) {
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
    //console.log(todo);

    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.textContent = todo;
    li.append(span)

    return li;
}

function addTodo() {
    console.log(`addTodo`);
}