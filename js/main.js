'use strict';

const tasksHeader = document.querySelector('.tasks__header');

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
