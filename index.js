// (() => {

// })()
let todos = [];

const get = () => JSON.parse(window.localStorage.getItem('todos'));
const set = () => window.localStorage.setItem('todos', JSON.stringify(todos));

if(get()?.length > 0) todos = get();

const $input = document.querySelector('input');
const $addButton = document.querySelector('button');
const $list = document.querySelector('section > ul');

$input.value = '';

const apagarTodo = (payload) => {
  todos = todos.filter(todo => todo.value !== payload);
}

const renderToDo = ({value, status}) => {
  const $li = document.createElement('li');
  $li.innerHTML = value;
  if(status === 'done') $li.classList.add('done');
  
  const $botaoApagar = document.createElement('button');
  $botaoApagar.innerText = 'apagar';
  $botaoApagar.addEventListener('click', evt => {
    evt.preventDefault();
    apagarTodo(value);
    render();
  })
  
  const $botaoToggle = document.createElement('button');
  $botaoToggle.innerText = 'toggle';
  $botaoToggle.addEventListener('click', evt => {
    evt.preventDefault();
    $li.classList.toggle('done');
    const index = todos.findIndex(todo => todo.value === value);
    todos[index].status = todos[index].status === 'done' ? 'to-do' : 'done';
    render();
  })

  // li > 2 buttons
  $li.appendChild($botaoApagar);
  $li.appendChild($botaoToggle);
  $list.appendChild($li);
}

const render = () => {
  $list.innerHTML = '';
  todos
  .sort(todo => todo.status === 'to-do' ? -1 : 1)
  .forEach(todo => renderToDo(todo));
  set(todos);
}

$addButton.addEventListener('click', evt => {
  evt.preventDefault();
  const nomeDaTarefa = $input.value;
  if(nomeDaTarefa === '') return;
  $input.value = '';
  todos.push({
    value: nomeDaTarefa,
    status: 'to-do'
  });
  render();
});

render();