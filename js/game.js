const score = document.querySelector('.score'); // получаем элемент для выведения очков игры
const start = document.querySelector('.start'); // получаем элемент для запуска игры
const gameArea = document.querySelector('.gameArea'); // тут будем выводить игровое поле
const car = document.createElement('div'); // создаем елемент с авто

car.classList.add('car'); // добавляем елементу класс CAR

const keys = { // создаем коллекцию используемых клавиш и присваиваем им значение отключено
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = { // коллекция настроек игры
  start: false,
  score: 0,
  speed: 3
}

function startGame() {  //создаем функцию для запуска игры
  start.classList.add('hide'); // прячем надпись приглашение
  setting.start = true; // изменяем значение для старта игры
  gameArea.appendChild(car); // создаем внутри игрового поля элемент CAR 
  requestAnimationFrame(playGame); // запускаем функцию отрисовки движения
}

function playGame() { // функция движения игры
  console.log('game play');
  if (setting.start) { // проверяем значение старта игры TRUE или FALSE для запуска движения если значение TRUE
    requestAnimationFrame(playGame); // перезапускаем функцию для плавного движения
  }
}

function startRun(event) { // функция начала движение
  event.preventDefault(); // отключаем стандартное поведение браузера
  keys[event.key] = true; // присваиваем значение TRUE нажатой клавише, что бы авто начало изменять положение.

}

function stopRun(event) { // функция конца движения
  event.preventDefault(); // отключаем стандартное поведение браузера
  keys[event.key] = false; // присваиваем значение FALSE отжатой клавишы, что бы авто начало изменять положение.
}

start.addEventListener('click', startGame); // прослушиваем элемент, и по клику запускаем функцию startGame
document.addEventListener('keydown', startRun); // прослушиваем весь документ на нажатия клавиш
document.addEventListener('keyup', stopRun); // прослушиваем весь документ на поднятия пальца с клавиш