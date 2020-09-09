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
  speed: 3,
  traffic: 3
}

function getQuantityElements(heightElement) { // Расчитываем кол-во элементов на дорогу изходя из их высоты
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {  //создаем функцию для запуска игры
  start.classList.add('hide'); // прячем надпись приглашение

  for (let i = 0; i < getQuantityElements(100); i++) { // Добавляем элемент Линии на дорогу
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 100) + 'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 1; i < getQuantityElements(100 * setting.traffic); i++) { // Добавляем Элемент врагов на дорогу
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * i;
    enemy.style.top = enemy.y + 'px';
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
    enemy.style.background = 'transparent url("./image/enemy.png") 50% 50% / cover no-repeat';
    gameArea.appendChild(enemy);
  }

  setting.start = true; // изменяем значение для старта игры
  gameArea.appendChild(car); // создаем внутри игрового поля элемент CAR
  setting.x = car.offsetLeft; // выясняем координату по горизонтали
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame); // запускаем функцию отрисовки движения
}

function playGame() { // функция движения игры

  if (setting.start) { // проверяем значение старта игры TRUE или FALSE для запуска движения если значение TRUE
    moveRoad(); // добавляем функцию отрисовки дорог
    moveEnemy(); // добавляем авто врагов

    if (keys.ArrowLeft && setting.x > 0) { // Проверяем если нажата стрелочка влево то отнимаем координаты, и двигаем машину влево
      setting.x -= setting.speed; // кол-во отниманимаемы пикселей зависит от значения SPEED
    }

    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) { // Проверяем нажата ли клавиша вправо и прибавляем значени координаты по горизонтали, двигаем машину вправо, проверяем машину у края иговой ширины и отнимаем ширину машины
      setting.x += setting.speed;
    }

    if (keys.ArrowUp && setting.y > 0) { // Проверяем нажата ли клавиша вверх и прибавляем значени координаты по вертикали, двигаем машину вверх
      setting.y -= (setting.speed + 1);
    }

    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) { // Проверяем нажата ли клавиша вниз и прибавляем значени координаты по вертикали, двигаем машину вниз
      setting.y += (setting.speed + 3);
    }

    car.style.left = setting.x + 'px'; // передаем значение в стили автомобиля
    car.style.top = setting.y + 'px';
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

function moveRoad() { // Анимируем дорогу, добавляем линии
  let lines = document.querySelectorAll('.line'); // Ищем все элементы линии в на дорогу
  lines.forEach(function (line) { // Перебираем все элементы
    line.y += setting.speed; // добавляем скорость движения линииям
    line.style.top = line.y + 'px'; // меняем расположение по вертикали

    if (line.y >= document.documentElement.clientHeight) { // убираем элементы за вверхний край дороги
      line.y = -100;
    }
  });
}

function moveEnemy() { // Анимируем врагов
  let enemys = document.querySelectorAll('.enemy');
  enemys.forEach(function (enemy) {
    enemy.y += setting.speed / 1.5; // меняем скорость что бы не казалось что они стоят на месте
    enemy.style.top = enemy.y + 'px';

    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -100 * setting.traffic;
      enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px'; // добавляем RND для расстановки авто по горизонтали
    }
  });
}

start.addEventListener('click', startGame); // прослушиваем элемент, и по клику запускаем функцию startGame
document.addEventListener('keydown', startRun); // прослушиваем весь документ на нажатия клавиш
document.addEventListener('keyup', stopRun); // прослушиваем весь документ на поднятия пальца с клавиш