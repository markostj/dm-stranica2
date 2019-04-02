let listElement, searchbarElement, toDoItems;

function getJSON(filePath, callback) {
  listElement = document.getElementById('js-list');
  searchbarElement = document.getElementById('js-searchbar');

  fetch(filePath)
    .then(file => file.json())   //dohvaca json i prebacuje ga u objekt 
    .then(json => {              //tu radi s tim objektom sada i vrsi se provjera
      if (callback && typeof callback === 'function') {
        callback(json.todos);
      }
    })
    .catch(error => console.log(error));
}

function renderTodoCards(todos) {
  toDoItems = todos;   //array je i ide kroz array
  todos.forEach(item => {
    listElement.innerHTML += renderToDoItem(item);
  });
}

function clearAllTodoCards() {
  listElement.innerHTML = '';
}

function filterTodoCards() {
  const searchQuery = searchbarElement.value;

  if (searchQuery.length > 3) {
    const filteredToDoItems = toDoItems.filter(todoItem =>
      todoItem.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    clearAllTodoCards();
    filteredToDoItems.forEach(item => {
      listElement.innerHTML += renderToDoItem(item);
    });

    return;
  }

  clearAllTodoCards();
  renderTodoCards(toDoItems);
}

function renderToDoItem(todo) {
  const { id, title, completed, date } = todo;
  const formatDate = () => {
    const dateObject = new Date(date);
    return `${dateObject.getDate()}.${dateObject.getMonth() +
      1}.${dateObject.getFullYear()}`;
  };

  return `<div data-moja-vrijednost="${id}" onclick="setCompletedStatus(event)" class="${
    completed ? 'item item-finished' : 'item'
  }">
    <h2 class="item-title">${title}</h2>
    <p class="item-date">${formatDate(date)}</p>
  </div>`;
}

function setCompletedStatus(event) {
  const { mojaVrijednost } = event.currentTarget.dataset;
  toDoItems = toDoItems.map(item => {
    if (item.id === mojaVrijednost) {
      item.completed = !!!item.completed;
      event.currentTarget.classList.toggle('item-finished');
    }

    return item;
  });
}

function addItem() {
  const { value } = searchbarElement;

  if (!value.length) {
    return;
  }

  // Dodati ID
  const newToDo = {
    id: '',
    title: value,
    completed: false,
    date: new Date()
  };

  listElement.innerHTML += renderToDoItem(newToDo);
  searchbarElement.value = '';
}
