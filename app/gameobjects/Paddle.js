/* Paddle represents a players paddle used to deflect the ball in the game */
var Paddle = function (playerNum, initialXPos, initialYPos, paddleWidth, paddleHeight, gameHeight, gameWidth, context) {
    this.fillStyle = "white";
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.context = context;

    this.movingUp = false;
    this.movingDown = false;

    this.isLeftPaddle = false;
    this.isRightPaddle = false;

    this.speed = 10;

    /* instance variables */
    this.xPos = initialXPos;
    this.yPos = initialYPos;

    this.points = 0;
    this.isIncreasePoints = false;

    if (playerNum == 1) {
        this.isLeftPaddle = true;
        console.log("Setting up left paddle, initial yPos");
    }

    if (playerNum == 2) {
        this.isRightPaddle = true;
        console.log("Setting up right paddle, intial yPos");
    }
};

Paddle.prototype.draw = function () {
    var limitTopPosition = 0;
    var limitBottomPosition = this.gameHeight - this.paddleHeight;

    if (this.movingUp) {
        if (this.yPos > limitTopPosition) {
            this.yPos -= this.speed;
        } else {
            this.yPos = 0;
        }
    }

    if (this.movingDown) {
        if (this.yPos < limitBottomPosition) {
            this.yPos += this.speed;
        } else {
            this.yPos = limitBottomPosition;
        }
    }

    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(this.xPos, this.yPos, this.paddleWidth, this.paddleHeight);

    this.context.font = "30px Arial";
    this.context.fillStyle = "white";
    if (this.isLeftPaddle)
        this.context.fillText(this.points.toString(), this.gameWidth / 2 - 50, 30);
    else
        this.context.fillText(this.points.toString(), this.gameWidth / 2 + 35, 30);
};

Paddle.prototype.startMovingUp = function () {
    this.movingUp = true;
    this.movingDown = false;
};

Paddle.prototype.startMovingDown = function () {
    this.movingUp = false;
    this.movingDown = true;
};

Paddle.prototype.stopMoving = function () {
    this.movingUp = false;
    this.movingDown = false;
};

Paddle.prototype.checkBallCollision = function (ball, otherPaddle) {
    if (this.isRightPaddle) {
        if (ball.getRightBorder() > this.xPos) {
            if (ball.getBottomBorder() > this.yPos && ball.getTopBorder() < this.yPos + this.paddleHeight) {
                ball.collisionDetected();
            } else {
                otherPaddle.isIncreasePoints = true;
            }
        }
    }

    if (this.isLeftPaddle) {
        if (ball.getLeftBorder() < this.xPos) {
            if (ball.getBottomBorder() > this.yPos && ball.getTopBorder() < this.yPos + this.paddleHeight) {
                ball.collisionDetected();
            } else {
                otherPaddle.isIncreasePoints = true;
            }
        }
    }

};

Paddle.prototype.checkPoints = function () {
    if (this.isIncreasePoints) {
        this.points++;
    }
    this.isIncreasePoints = false;
}