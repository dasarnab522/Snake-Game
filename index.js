// Game Constants & Variables
//console.log("arnab");
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-chewing-something-crunchy-2244.mp3"
);
const gameOverSound = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-player-losing-or-failing-2042.mp3"
);
const moveSound = new Audio(
  "https://audio-previews.elements.envatousercontent.com/files/395764056/preview.mp3?response-content-disposition=attachment%3B+filename%3D%22SMEFMQE-snake-movement.mp3%22"
);
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
speedShow.innerHTML = "Speed: " + speed;
let flag = true
document.getElementById("fivex").addEventListener("click", () => {
  if(flag){
  speed = 5
  speedShow.innerHTML = "Speed:" + speed;}
})
document.getElementById("tenx").addEventListener("click", () => {
  if(flag){
  speed = 10
  speedShow.innerHTML = "Speed:" + speed;}
})
document.getElementById("fivtx").addEventListener("click", () => {
  if(flag){
  speed = 15
  speedShow.innerHTML = "Speed:" + speed;}
})

food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again! Score:-" + score);
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    flag = true
    scoreBox.innerHTML = "Score: " + "0";
  }
  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (speed === 5 && score > fiveVal) {
      fiveVal = score;
      localStorage.setItem("fivScore", JSON.stringify(fiveVal))
      five.innerHTML = "5x:- " + fiveVal
    }
    else if (speed === 10 && score > tenVal) {
      tenVal = score;
      localStorage.setItem("tenScore", JSON.stringify(tenVal))
      ten.innerHTML = "10x:- " + tenVal
    }
    else if (speed === 15 && score > fivtVal) {
      fivtVal = score;
      localStorage.setItem("fivtScore", JSON.stringify(fivtVal))
      fivt.innerHTML = "15x:- " + fivtVal
    }
    
    scoreBox.innerHTML = "Score: " + score;

    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    //console.log(flag)
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
   // console.log(snakeElement);
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main logic starts here
let fiveScore = localStorage.getItem("fivScore");
let tenScore = localStorage.getItem("tenScore");
let fivtScore = localStorage.getItem("fivtScore");
if (fiveScore === null) {
  fiveVal = 0;
  localStorage.setItem("fivScore", JSON.stringify(fiveVal));
} else {
  fiveVal = JSON.parse(fiveScore);
  five.innerHTML = "5X:- " + fiveScore
}
if (tenScore === null) {
  tenVal = 0;
  localStorage.setItem("tenScore", JSON.stringify(tenVal));
} else {
  tenVal = JSON.parse(tenScore);
  ten.innerHTML = "10X:- " + tenScore
}
if (fivtScore === null) {
  fivtVal = 0;
  localStorage.setItem("fivtScore", JSON.stringify(fivtVal));
} else {
  fivtVal = JSON.parse(fivtScore);
  fivt.innerHTML = "15X:- " + fivtScore
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  flag = false;
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
