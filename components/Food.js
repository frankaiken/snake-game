const Food = {
    x: 5,
    y: 5,

    randomize(tileCount) {
        this.x = Math.floor(Math.random() * tileCount);
        this.y = Math.floor(Math.random() * tileCount);
    },

    draw(ctx, gridSize) {
        const radius = gridSize / 2;
        const centerX = this.x * gridSize + radius;
        const centerY = this.y * gridSize + radius;

        // Draw a clean red circle for the food
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 1, 0, 2 * Math.PI);
        ctx.fillStyle = "#ff3333";
        ctx.fill();
        ctx.closePath();
    }
};