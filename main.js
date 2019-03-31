    function getJSON(filePath, callback) {
      fetch(filePath)
        .then(file => file.json())  //ucitat tu datoteku i pretvorit ce string u javascript objekt
        .then(json => {
          if (callback && typeof callback === 'function') {
            callback(json);
          }
        })
        .catch(error => console.log(error));
    }
    
    function renderTodoCards(todoList) {       //todoList je obraden json file
      const listElement = document.getElementById('js-list');
      const { todos } = todoList;
    
      todos.forEach(item => {
        listElement.innerHTML += renderToDoItem(item);  // imeNeko.innerHTML ubacivanje
      });
    }
    
    function renderToDoItem(todo) {
      const { title, completed, date } = todo;
    
      return `<div class="${completed ? 'item item-finished' : 'item'}">
        <h2 class="item-title">${title}</h2>
        <p class="item-date">${realDate(date)}</p>
      </div>`;
    }

function realDate(date){
  const dateObj = new Date(date);
  return `${dateObj.getDate(date)}.${dateObj.getMonth(date)}.${dateObj.getFullYear(date)}`
   }       
