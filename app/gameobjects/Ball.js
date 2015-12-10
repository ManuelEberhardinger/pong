/* The ball in the pong game */
var Ball = function(initialXPos, initialYPos, ballDiameter, gameHeight, gameWidth, context) {
    this.fillStyle = "white";
    this.ballDiameter = ballDiameter;
    this.ballRadius = ballDiameter/2;
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    
    this.context = context;
    
    this.initialXSpeed = 5;
    this.xSpeed = 5;
    this.ySpeed = Math.floor((Math.random() * 5) + 1);
    
    this.initialXPos = initialXPos;
    this.initialYPos = initialYPos;
    
    /* instance variables */
    this.xPos = initialXPos;
    this.yPos = initialYPos;
};

Ball.prototype.draw = function(leftPlayer, rightPlayer) {
    this.checkTopBorderCollision();
    this.checkBottomBorderCollision();
    
    this.playerHasMissedBall(leftPlayer, rightPlayer);
    
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    
    this.context.fillStyle = this.fillStyle;
    this.context.fillRect(this.xPos, this.yPos, this.ballDiameter, this.ballDiameter);
};


Ball.prototype.getRightBorder = function() {
    return this.xPos + this.ballRadius; 
};

Ball.prototype.getLeftBorder = function() {
    return this.xPos - this.ballRadius; 
};

Ball.prototype.getTopBorder = function() {
    return this.yPos - this.ballRadius; 
};

Ball.prototype.getBottomBorder = function() {
    return this.yPos + this.ballRadius; 
};

Ball.prototype.checkTopBorderCollision = function() {
    if (this.yPos < 0) {
        this.ySpeed *= -1;
    }
}

Ball.prototype.checkBottomBorderCollision = function() {
    if ((this.yPos + this.ballDiameter) > this.gameHeight) {
        this.ySpeed *= -1;
    }
}

Ball.prototype.playerHasMissedBall = function(leftPaddle, rightPaddle) {
    if (this.xPos < 0 || this.xPos > this.gameWidth) {
        this.ySpeed = Math.floor((Math.random() * 5) + 1);
        this.xSpeed = this.initialXSpeed;
        
        this.xPos = this.initialXPos;
        this.yPos = this.initialYPos;
        
        leftPaddle.checkPoints();
        rightPaddle.checkPoints();
    }
}

Ball.prototype.collisionDetected = function() {
    console.log("ball collision detected");
    this.xSpeed *= -1;
    if(this.xSpeed > 0)
        this.xSpeed+=0.3;
    else
        this.xSpeed-=0.3;
};