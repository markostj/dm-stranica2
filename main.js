
  function getJSON(filePath, callback) {
    fetch(filePath)
      .then(file => file.json())     //ucitat tu datoteku i pretvorit ce string u javascript objekt
      .then(json => {
        if (callback && typeof callback === 'function') {
          callback(json);
        }
      })
      .catch(error => console.log(error));
  }
  
  function renderTodoCards(todoList) {     //todoList je obraden json file
    const listElement = document.getElementById('js-list');
    const { todos } = todoList;
  
    todos.forEach(item => {
      listElement.innerHTML += renderToDoItem(item);
    });
  }
  
  function renderToDoItem(todo) {
    const { title, completed, date } = todo;
  
    return `<div class="${completed ? 'item item-finished' : 'item'}">
      <h2 class="item-title">${title}</h2>
      <p class="item-date">${date}</p>
    </div>`;
  }

    //imeNeko.innerHTML dodavanje
  