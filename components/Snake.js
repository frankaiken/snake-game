const Snake = {
    body: [{ x: 10, y: 10 }],
    dx: 0,
    dy: 0,

    move(food, tileCount) {
        const newHead = { 
            x: this.body[0].x + this.dx, 
            y: this.body[0].y + this.dy 
        };
        
        this.body.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            food.randomize(tileCount);
            Score.increase();
        } else {
            this.body.pop();
        }
    },

    reset() {
        this.body = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
    },

    draw(ctx, gridSize) {
        this.body.forEach((part, index) => {
            const isHead = index === 0;
            const xPixel = part.x * gridSize;
            const yPixel = part.y * gridSize;
            const size = gridSize - 1; 

            if (isHead) {
                // Draw a solid dark green head block
                ctx.fillStyle = "#00cc00"; 
                ctx.fillRect(xPixel, yPixel, size, size);

                // Setup eye positions based on direction
                ctx.fillStyle = "white";
                let eye1 = { x: 0, y: 0 };
                let eye2 = { x: 0, y: 0 };

                if (this.dx === 1) { // Right
                    eye1 = { x: xPixel + size - 6, y: yPixel + 4 };
                    eye2 = { x: xPixel + size - 6, y: yPixel + size - 7 };
                } else if (this.dx === -1) { // Left
                    eye1 = { x: xPixel + 3, y: yPixel + 4 };
                    eye2 = { x: xPixel + 3, y: yPixel + size - 7 };
                } else if (this.dy === 1) { // Down
                    eye1 = { x: xPixel + 4, y: yPixel + size - 6 };
                    eye2 = { x: xPixel + size - 7, y: yPixel + size - 6 };
                } else { // Up or Idle
                    eye1 = { x: xPixel + 4, y: yPixel + 3 };
                    eye2 = { x: xPixel + size - 7, y: yPixel + 3 };
                }

                // Draw white squares for eyes
                ctx.fillRect(eye1.x, eye1.y, 3, 3);
                ctx.fillRect(eye2.x, eye2.y, 3, 3);

                // Draw tiny black pupils
                ctx.fillStyle = "black";
                ctx.fillRect(eye1.x + 1, eye1.y + 1, 1, 1);
                ctx.fillRect(eye2.x + 1, eye2.y + 1, 1, 1);

            } else {
                // Alternating shade body pattern
                ctx.fillStyle = index % 2 === 0 ? "#00ff00" : "#00dd00";
                
                // Draw standard body block with a 2px buffer to make segments visible
                ctx.fillRect(xPixel + 1, yPixel + 1, size - 1, size - 1);
            }
        });
    }
};