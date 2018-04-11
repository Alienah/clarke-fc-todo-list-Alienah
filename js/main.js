'use strict';

window.onload = function() {
  const tasksHeader = document.querySelector('.tasks__header');
  const inputTask = document.querySelector('.input-task');
  let inputTaskValue = {
    'text': '',
    'checkValue': false,
    'id': ''
  };
  const tasksListContainer = document.querySelector('.tasks');
  const taskItemContainer = document.querySelector('.task-item');
  const btnShowAddNew = document.getElementById('btn--plus');
  const newTaskContainer = document.getElementById('new-task__container');
  const btnAddNew = document.querySelector('.btn--add-new');
  let tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  //Set and Get data from localStorage
  localStorage.setItem('tasks', JSON.stringify(tasksArray) );
  const dataFromStorage = JSON.parse(localStorage.getItem('tasks'));

  //Get Date
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

  //Manage elements clicked
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

  //Change visualization of item clicked and its storage
  const handleTasksDone = (select) => {
    const targetParent = select.parentElement;
    const selectId = targetParent.getAttribute('id');
    for (var i = 0; i < tasksArray.length; i++) {
      if (select.checked == true) {
        targetParent.classList.add('cross');
        tasksListContainer.append(targetParent);
        if (selectId == tasksArray[i].id) {
          tasksArray[i].checkValue = true;
          localStorage.setItem('tasks', JSON.stringify(tasksArray) );
        }
      }
      else {
        targetParent.classList.remove('cross');
        tasksListContainer.prepend(targetParent);
        if (selectId == tasksArray[i].id) {
          tasksArray[i].checkValue = false;
          localStorage.setItem('tasks', JSON.stringify(tasksArray) );
        }
      }
    }
  }

  //Set onclick functions in elements created later
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

  //Paint Tasks function definition
  const paintList = (text, id) => {
    const taskItem = `<li class="task-item" id="${id}"><input type="checkbox" class="checkbox">${text}</li>`;
    tasksListContainer.insertAdjacentHTML('afterbegin', taskItem);
    setEvent();
  };

  //Add new Task
  const handleInsertTask = (text) => {
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
    hideNewTaskContainer();
  }
  btnAddNew.addEventListener('click', handleInsertTask);

  //Manage data from Storage
  const paintTasksFromStorage = () => {
    dataFromStorage.map(task => {
      paintList(task.text, task.id);
      if (task.checkValue == true) {
        const idToCompare = document.getElementById(`${task.id}`);
        idToCompare.children[0].checked = true;
        idToCompare.classList.add('cross');
        tasksListContainer.append(idToCompare);
      }
    })
  }
  paintTasksFromStorage();

  const showNewTaskContainer = () => {
    newTaskContainer.classList.add('visible');
    newTaskContainer.classList.remove('invisible');
  }
  btnShowAddNew.addEventListener('click', showNewTaskContainer);

  const hideNewTaskContainer = () => {
    newTaskContainer.classList.add('invisible');
  }
}
