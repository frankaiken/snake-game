const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); 
const restartBtn = document.getElementById("restartBtn");

const gridSize = 20; 
const tileCount = canvas.width / gridSize;

function gameLoop() {
    if (checkGameOver()) {
        // Check if the player broke the all-time record
        if (Score.current > Score.high) {
            Score.checkAndUpdateHigh();
            Toast.show(`🏆 NEW HIGH SCORE: ${Score.high}!`, "success");
        } else {
            Toast.show(`💥 Game Over! Score: ${Score.current}`, "error");
        }
        return; 
    }

    // Clear background
    ctx.fillStyle = "#111"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and Draw components
    Snake.move(Food, tileCount);
    Food.draw(ctx, gridSize);
    Snake.draw(ctx, gridSize);
    Score.draw(ctx);

    setTimeout(gameLoop, 100);
}

function checkGameOver() {
    const head = Snake.body[0];

    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    // Self collision
    for (let i = 1; i < Snake.body.length; i++) {
        if (head.x === Snake.body[i].x && head.y === Snake.body[i].y) {
            return true; 
        }
    }
    return false;
}

// Input Listener
window.addEventListener("keydown", event => {
    if (event.key === "ArrowUp" && Snake.dy !== 1) { Snake.dx = 0; Snake.dy = -1; }
    else if (event.key === "ArrowDown" && Snake.dy !== -1) { Snake.dx = 0; Snake.dy = 1; }
    else if (event.key === "ArrowLeft" && Snake.dx !== 1) { Snake.dx = -1; Snake.dy = 0; }
    else if (event.key === "ArrowRight" && Snake.dx !== -1) { Snake.dx = 1; Snake.dy = 0; }
});

// Restart Button
restartBtn.addEventListener("click", () => {
    if (checkGameOver()) {
        Snake.reset();
        Score.reset();
        Food.randomize(tileCount);
        gameLoop();
    }
});

// Kick off the engine
gameLoop();