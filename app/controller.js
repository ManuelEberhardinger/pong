function init() {
    $("#start-game").click(loadDifficulty);
    var winner = getUrlParameter('winner');
    if (winner != undefined)
        showWinner(winner);
}

function loadDifficulty() {
    $("#start-game").remove();
    $("#winner-label").remove();
    
    var centerBlock = $('#center-items');
    
    centerBlock.append($('<button id="easy-button">easy</button><br>'));
    centerBlock.append($('<button id="middle-button">middle</button><br>'));
    centerBlock.append($('<button id="hard-button">hard</button><br>'));   
    
    $("#easy-button").click(loadPongPageEasy);
    $("#middle-button").click(loadPongPageMiddle);
    $("#hard-button").click(loadPongPageHard);
}

function loadPongPageEasy() {
    window.location.href = 'pong.html?difficulty=easy';
}

function loadPongPageMiddle() {
    window.location.href = 'pong.html?difficulty=middle';
}

function loadPongPageHard() {
    window.location.href = 'pong.html?difficulty=hard';
}

function getUrlParameter(param) {
    var pageUrl = decodeURIComponent(window.location.search.substring(1));
    var urlVariables = pageUrl.split('&');

    for (var i = 0; i < urlVariables.length; i++) {
        var parameterName = urlVariables[i].split('=');

        if (parameterName[0] == param) {
            return parameterName[1] == undefined ? true : parameterName[1];
        }
    }
}

function showWinner(winner) {
    var centerBlock = $('#center-items');
    if (winner == 'player1')
        winner = 'Player 1';
    else
        winner = 'Player 2';

    centerBlock.append($('<br><label id="winner-label">' + winner + ' won the game!</label>'));
}
