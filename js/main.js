'use strict';

window.onload = function() {
  const tasksHeader = document.querySelector('.tasks__header');
  const btnAddNew = document.querySelector('.btn--add-new');
  const inputTask = document.querySelector('.input-task');
  let inputTaskValue = {
    'text': '',
    'checkValue': false,
    'id': ''
  };
  const tasksListContainer = document.querySelector('.tasks');
  const taskItemContainer = document.querySelector('.task-item');
  let tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  localStorage.setItem('tasks', JSON.stringify(tasksArray) );
  const dataFromStorage = JSON.parse(localStorage.getItem('tasks'));

  const paintDate = () => {
    const months = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const daysWeek = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    const date = new Date();
    let buildDate =
      `<div class="date__container">
        <span class="date--number"> ${date.getDate()}</span>
        <div>
          <p class="date--day-week">${daysWeek[date.getDay()]}</p>
          <p class="date--month-year">${months[date.getMonth()]}, ${date.getFullYear()}</p>
        </div>
      </div>`

    tasksHeader.insertAdjacentHTML('beforeend', buildDate);
  }

  const handleCheckBox = (e) => {
    handleTasksDone(e.target);
  }

  const handleTaskLi = (e) => {
    if (e.target.children[0].checked == true){
      e.target.children[0].checked = false;
    } else {
      e.target.children[0].checked = true;
    }
    handleTasksDone(e.target.children[0]);

  }

  const handleTasksDone = (select) => {
    const targetParent = select.parentElement;
    const selectId = targetParent.getAttribute('id');
    console.log(selectId);
    if (select.checked == true) {
      targetParent.classList.add('cross');
      tasksListContainer.append(targetParent);
      for (var i = 0; i < tasksArray.length; i++) {
        if (selectId == tasksArray[i].id) {
          tasksArray[i].checkValue = true;
          localStorage.setItem('tasks', JSON.stringify(tasksArray) );
        }
      }

      console.log(tasksArray);
    }
    else {
      targetParent.classList.remove('cross');
      tasksListContainer.prepend(targetParent);
    }
  }

  const setEvent = () => {
    const checkboxContainer = document.querySelectorAll('.checkbox');
    const allTaskContainer = document.querySelectorAll('.task-item')
    for (var i = 0; i < checkboxContainer.length; i++) {
      checkboxContainer[i].addEventListener('click', handleCheckBox);
      allTaskContainer[i].addEventListener('click', handleTaskLi);
    }
  }
  setEvent();
  paintDate();

  const paintList = (text, id) => {
    const taskItem = `<li class="task-item" id="${id}"><input type="checkbox" class="checkbox">${text}</li>`;
    tasksListContainer.insertAdjacentHTML('afterbegin', taskItem);
    setEvent();
  };

  const handleInputTask = (text) => {
    inputTaskValue = {
      'text': inputTask.value,
      'checkValue': false
    };
    paintList(inputTaskValue.text);
    tasksArray.push(inputTaskValue);
    for (var i = 0; i < tasksArray.length; i++) {
      tasksArray[i].id = i
    }
    localStorage.setItem('tasks', JSON.stringify(tasksArray) );
  }
  btnAddNew.addEventListener('click', handleInputTask);

  dataFromStorage.map(task => {
    paintList(task.text, task.id);
    // function check = (valueStorage) => {
    //   if (task.checkValue == false) {
    //     task.checkValue == true
    //   }
    // }
  })

}
