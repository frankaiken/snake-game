const Score = {
    current: 0,
    high: localStorage.getItem("snakeHighScore") || 0,

    increase() {
        this.current++;
    },

    checkAndUpdateHigh() {
        if (this.current > this.high) {
            this.high = this.current;
            localStorage.setItem("snakeHighScore", this.high);
        }
    },

    reset() {
        this.current = 0;
    },

    draw(ctx) {
        ctx.fillStyle = "white";          
        ctx.font = "16px Arial";          
        ctx.fillText("Score: " + this.current, 20, 30); 
        ctx.fillText("High Score: " + this.high, 260, 30); 
    }
};