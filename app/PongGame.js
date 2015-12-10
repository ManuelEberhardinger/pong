var pongGame = (function () {
    var privateContext;
    var privateCanvas;

    /* game constants */
    var GAME_WIDTH = 600;
    var GAME_HEIGHT = 600;

    var PADDLE_WIDTH = 15;
    var PADDLE_HEIGHT = 80;
    var INITIAL_X_POS_LEFT_PLAYER = 0;
    var INITIAL_X_POS_RIGHT_PLAYER = GAME_WIDTH - PADDLE_WIDTH;

    var BALL_SIZE = 15;

    var INITIAL_X_POS_BALL = 40;
    var INITIAL_Y_POS_BALL = 20;

    var PLAYER_ONE = 1;
    var PLAYER_TWO = 2;

    // background image
    var background = new Image();

    /* key codes */
    var KEY_LEFT_PLAYER_MOVE_UP = 65; //A
    var KEY_LEFT_PLAYER_MOVE_DOWN = 89; //Y
    var KEY_RIGHT_PLAYER_MOVE_UP = 38; //Arrow up
    var KEY_RIGHT_PLAYER_MOVE_DOWN = 40; //Arrow down

    /* game objects */
    var paddleLeftPlayer;
    var paddleRightPlayer;
    var ball;

    function publicSetBackgroundSrc(src) {
        background.src = src;       
    }

    function privateSetContext(canvas) {
        privateCanvas = canvas;
        privateContext = canvas.getContext("2d");
    }

    function privateSetupGameComponents() {
        paddleLeftPlayer = new Paddle(PLAYER_ONE, INITIAL_X_POS_LEFT_PLAYER, GAME_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, GAME_HEIGHT, GAME_WIDTH, privateContext);
        paddleRightPlayer = new Paddle(PLAYER_TWO, INITIAL_X_POS_RIGHT_PLAYER, GAME_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, GAME_HEIGHT, GAME_WIDTH, privateContext);
        ball = new Ball(INITIAL_X_POS_BALL, INITIAL_Y_POS_BALL, BALL_SIZE, GAME_HEIGHT, GAME_WIDTH, privateContext);
    }

    function privateSetupKeyListeners() {
        //bring canvas into focus to capture key strokes
        privateCanvas.setAttribute('tabindex', '0');
        privateCanvas.focus();

        privateCanvas.addEventListener("keydown", privateKeyPressedDown, false);
        privateCanvas.addEventListener("keyup", privateKeyReleased, false);
        console.log("key event listener set");
    }

    /* key handling */
    function privateKeyPressedDown(e) {
        var key = e.keyCode;

        switch (key) {
        case KEY_LEFT_PLAYER_MOVE_UP:
            paddleLeftPlayer.startMovingUp();
            break;
        case KEY_LEFT_PLAYER_MOVE_DOWN:
            paddleLeftPlayer.startMovingDown();
            break;
        case KEY_RIGHT_PLAYER_MOVE_UP:
            paddleRightPlayer.startMovingUp();
            break;
        case KEY_RIGHT_PLAYER_MOVE_DOWN:
            paddleRightPlayer.startMovingDown();
            break;
        }
    }

    function privateKeyReleased(e) {
        var key = e.keyCode;

        switch (key) {
        case KEY_LEFT_PLAYER_MOVE_UP:
            paddleLeftPlayer.stopMoving();
            break;
        case KEY_LEFT_PLAYER_MOVE_DOWN:
            paddleLeftPlayer.stopMoving();
            break;
        case KEY_RIGHT_PLAYER_MOVE_UP:
            paddleRightPlayer.stopMoving();
            break;
        case KEY_RIGHT_PLAYER_MOVE_DOWN:
            paddleRightPlayer.stopMoving();
            break;
        }
    }

    function publicInit(canvas, speed, paddleHeight, paddleWidth, ballSize) {

        PADDLE_HEIGHT = paddleHeight;
        PADDLE_WIDTH = paddleWidth;
        BALL_SIZE = ballSize;

        fetchFlickrData();

        privateSetContext(canvas);
        privateSetupGameComponents();

        privateSetupKeyListeners();

        ball.initialXSpeed = speed;
        ball.xSpeed = speed;

        window.requestAnimationFrame(privateDraw);
    }

    function checkCollisions() {
        paddleLeftPlayer.checkBallCollision(ball, paddleRightPlayer);
        paddleRightPlayer.checkBallCollision(ball, paddleLeftPlayer);
    }

    function privateDraw() {
        privateContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT); // clear the canvas
        privateDrawGameField();
        paddleLeftPlayer.draw();
        paddleRightPlayer.draw();

        checkCollisions();
        ball.draw(paddleLeftPlayer, paddleRightPlayer);

        if (paddleLeftPlayer.points >= 11)
            window.location.href = "index.html?winner=player1";
        else if (paddleRightPlayer.points >= 11)
            window.location.href = "index.html?winner=player2";

        window.requestAnimationFrame(privateDraw);
    }

    function privateDrawGameField() {
        privateContext.drawImage(background, 0, 0);
        privateDrawNet();
    }

    function privateDrawNet() {
        var netWidth = 8;
        privateContext.strokeStyle = "white";
        privateContext.lineWidth = netWidth;
        privateContext.setLineDash([8, 8]);
        privateContext.beginPath();
        privateContext.moveTo(GAME_WIDTH / 2, 0);
        privateContext.lineTo(GAME_WIDTH / 2, GAME_HEIGHT);
        privateContext.stroke();
    }

    function fetchFlickrData(event) {
        var url = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&";
        url += "tags=" + "Darth Vader";

        $.ajax({
            url: url,
            success: jsonFlickrFeed,
            dataType: "jsonp"
        });
    }

    // Reveal public pointers to
    // private functions and properties

    return {
        init: publicInit,
        setBackgroundSrc: publicSetBackgroundSrc
    };
})();

function initGame() {

    var canvas = document.querySelector("#pongcanvas");

    var difficulty = getUrlParameter('difficulty');
    /* setup the game */
    if (difficulty == "easy")
        pongGame.init(canvas, 5, 80, 15, 15);
    else if (difficulty == "middle")
        pongGame.init(canvas, 8, 60, 15, 10);
    else if (difficulty == "hard")
        pongGame.init(canvas, 11, 40, 15, 5);

}

function jsonFlickrFeed(data) {
    console.log("Results from Flickr received...");
    var randomNumber = Math.floor((Math.random() * data.items.length));
    pongGame.setBackgroundSrc(data.items[randomNumber].media.m);
}