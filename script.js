let gameBoardElement = null;
let counterLivesElement = null;
let counterScoreElement = null;
let counterTimeElement = null;
const player = {
    x: 0,
    speed: 0,
    maxSpeed: 500,
    element: null,
    lives: 3
};

const fruits = [];
const fruitImages = [
    "./img/fruit1.png",
    "./img/fruit2.png",
    "./img/fruit3.png",
    "./img/fruit4.png",
];

const updateInterval = 1 / 60;

function waitLoad() {
    return new Promise(resolve => {
        document.addEventListener("DOMContentLoaded", resolve);
    });
}

function randomItemFromArray(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function spawnFruit() {
    const fruitElement = document.createElement("img");
    fruitElement.classList.add("fruit");

    fruitElement.src = randomItemFromArray(fruitImages);

    gameBoardElement.appendChild(fruitElement);

    const fruit = {
        x: Math.random() * (gameBoardElement.clientWidth - fruitElement.clientHeight),
        y: -80,
        // ДЗ: rotateZ
        speed: 150 + Math.random() * 300,
        element: fruitElement,
    };

    fruitElement.style.left = `${fruit.x}px`;
    fruitElement.style.top = `${fruit.y}px`;

    fruits.push(fruit);
}

async function main() {
    await waitLoad();

    gameBoardElement = document.querySelector(".game-board");
    player.element = document.querySelector(".player");
    counterLivesElement = document.querySelector(".counter-lives");
    counterScoreElement = document.querySelector(".counter-score");
    counterTimeElement = document.querySelector(".counter-time");

    document.body.addEventListener("keydown", event => {
        if (event.repeat) {
            return;
        }

        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            player.speed = -player.maxSpeed;
        } else if (event.code === "ArrowRight" || event.code === "KeyD") {
            player.speed = player.maxSpeed;
        }
    });

    document.body.addEventListener("keyup", event => {
        if (event.code === "ArrowLeft" || event.code === "KeyA") {
            player.speed = 0;
        } else if (event.code === "ArrowRight" || event.code === "KeyD") {
            player.speed = 0;
        }
    });

    player.x = gameBoardElement.clientWidth / 2 - player.element.clientWidth / 2;

    // ДЗ: requestAnimationFrame()
    setInterval(update, updateInterval * 1_000);

    setInterval(spawnFruit, 1_000);
}

function update() {
    player.x += player.speed * updateInterval;

    if (player.x < 0) {
        player.x = 0;
    } else if (player.x > gameBoardElement.clientWidth - player.element.clientWidth) {
        player.x = gameBoardElement.clientWidth - player.element.clientWidth
    }

    player.element.style.left = `${player.x}px`;

    for (const fruit of fruits) {
        fruit.y += fruit.speed * updateInterval;
        fruit.element.style.top = `${fruit.y}px`;
    }

    for (let i = 0; i < fruits.length; i++) {
        const fruit = fruits[i];
        if (fruit.y > gameBoardElement.clientHeight + 10) {
            fruits.splice(i, 1);
            fruit.element.remove();

            player.lives--;
            counterLivesElement.innerText = player.lives;
        }
    }
}

main()
