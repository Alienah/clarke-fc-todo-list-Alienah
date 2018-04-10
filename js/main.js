'use strict';

const tasksHeader = document.querySelector('.tasks__header');
const btnAddNew = document.querySelector('.btn--add-new');
const inputTask = document.querySelector('.input-task');
let inputTaskValue;
const tasksListContainer = document.querySelector('.tasks');
// const checkboxContainer = document.querySelectorAll('.checkbox');
const taskItemContainer = document.querySelector('.task-item');
let tasksArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

localStorage.setItem('tasks', JSON.stringify(tasksArray) );
const data = JSON.parse(localStorage.getItem('tasks'));

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
paintDate();

const paintList = (text) => {
  const taskItem = `<li class="task-item"><input type="checkbox" class="checkbox">${text}</li>`;
  tasksListContainer.insertAdjacentHTML('afterbegin', taskItem);
};

const handleInputTask = (text) => {
  inputTaskValue = inputTask.value;
  paintList(inputTaskValue);
  tasksArray.push(inputTaskValue);
  localStorage.setItem('tasks', JSON.stringify(tasksArray) );

}
btnAddNew.addEventListener('click', handleInputTask);

data.forEach(task => {
  paintList(task);
});

const handleCheckBox = (e) => {
  const targetParent = e.target.parentElement;
  console.log(targetParent);
  if (e.target.checked == true) {
    targetParent.classList.add('cross');
  }
  else {
    targetParent.classList.remove('cross');
  }
}
const setEvent = () => {
  const checkboxContainer = document.querySelectorAll('.checkbox');
  for (var i = 0; i < checkboxContainer.length; i++) {
    checkboxContainer[i].addEventListener('click', handleCheckBox);
  }
}
setEvent();
