const startBtn = document.querySelector('.start'),
    screens = document.querySelectorAll('.screen'),
    timeBlock = document.querySelector('.time-block'),
    timeCounter = document.getElementById('time'),
    board = document.getElementById('board');

let time = 0;
let score = 0;
const colors = ['#BB86FC', '#3700B3', '#6200EE', '#03DAC6', '#018786', '#B00020', '#FF0266',
                '#FFDE03', '#7E57C2', '#64FFDA', '#69F0AE', '#FF7043'];

const setTime = value => {
    timeCounter.innerHTML = `00:${value}`;
};

const setRandomColor = () => {
    const i = Math.floor(Math.random() * colors.length);

    return colors[i];
};

const stopGame = () => {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
    timeCounter.parentNode.classList.add('hide');
};

const decreaseTime = () => {
    if (time === 0) {
        stopGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`;
        }
        setTime(currentTime);
    }
};

const getCircleRadius = (min, max) => Math.round(Math.random() * (max - min) + min);

const createRandomCircles = () => {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circleSize = getCircleRadius(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getCircleRadius(0, width - circleSize);
    const y = getCircleRadius(0, height - circleSize);

    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    const color = setRandomColor();
    circle.style.backgroundColor = color;

    board.append(circle);
};

const startGame = () => {
    setInterval(decreaseTime, 1000);
    createRandomCircles();
    setTime(time);
};

board.addEventListener('click', ev => {
    if (ev.target.classList.contains('circle')) {
        score++;
        ev.target.remove();
        createRandomCircles();
    }
});
startBtn.addEventListener('click', ev => {
    ev.preventDefault();
    screens[0].classList.add('up');
});
timeBlock.addEventListener('click', ev => {
    if (ev.target.classList.contains('time-btn')) {
        time = parseInt(ev.target.getAttribute('data-time'));
        screens[1].classList.add('up');

        startGame();
    }
});