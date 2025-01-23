// Define the grid and game constants
const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
let timerId;
const userStart = [230, 10];
let currentPosition = userStart;

let xDirection = 2;
let yDirection = 2;

const ballDiameter = 20;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// Create block class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// Create blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

//     new Block(10, 240),
//     new Block(120, 240),
//     new Block(230, 240),
//     new Block(340, 240),
//     new Block(450, 240),

//     new Block(10, 210),
//     new Block(120, 210),
//     new Block(230, 210),
//     new Block(340, 210),
//     new Block(450, 210),

//     new Block(10, 180),
//     new Block(120, 180),
//     new Block(230, 180),
//     new Block(340, 180),
//     new Block(450, 180),
];

// Add blocks to the grid
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlocks();

// Add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

// Draw user
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// Move user
function moveUser(e) {
    e.preventDefault(); // Prevent default arrow key behavior
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}
document.addEventListener('keydown', moveUser);

// Draw ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

// Move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

// Collision detection
function checkForCollisions() {
    // Ball hits left or right wall
    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= (boardWidth - ballDiameter)) {
        xDirection *= -1; // Reverse horizontal direction
    }

    // Ball hits the top wall
    if (ballCurrentPosition[1] >= (boardHeight - ballDiameter)) {
        yDirection *= -1; // Reverse vertical direction
    }

    // Ball hits the paddle
    if (
        ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < (currentPosition[0] + blockWidth) &&
        ballCurrentPosition[1] <= (currentPosition[1] + blockHeight)
    ) {
        yDirection *= -1;
    }

    // Ball hits a block
    const allBlocks = Array.from(document.querySelectorAll('.block'));
    allBlocks.forEach((block, index) => {
        const blockRect = block.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        if (
            ballRect.left < blockRect.right &&
            ballRect.right > blockRect.left &&
            ballRect.top < blockRect.bottom &&
            ballRect.bottom > blockRect.top
        ) {
            block.classList.remove('block'); // Remove block from DOM
            blocks.splice(index, 1); // Remove block from array
            yDirection *= -1; // Reverse ball direction

            // Check if all blocks are removed
           if (blocks.length === 0) {
    clearInterval(timerId);
    document.querySelector('.grid').innerHTML = '<h1>Congratulations! You Win!</h1>';
    setTimeout(() => {
        document.querySelector('.grid').innerHTML = '<h1>Game Over</h1>';
    }, 3000); // Show 'Game Over' after 3 seconds
}
        }
    });

    // Ball falls out of bounds (game over)
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        grid.innerHTML = '<h1>Game Over</h1>';
    }
}

// Start ball movement
timerId = setInterval(moveBall, 30);
