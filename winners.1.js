var winners = new Array();
var player1Selections = new Array();
var player2Selections = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;
var points2 = 0;
var size = 3;

function Board() {
    var Parent = document.getElementById("game");
    var counter = 1;
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }
    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");
        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = counter;
            var handler = function (e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function (a, b) { return a - b; });
                    d('player1').classList.remove('selected');
                    d('player2').classList.add('selected');
                }
                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function (a, b) { return a - b; });
                    d('player1').classList.add('selected');
                    d('player2').classList.remove('selected');
                }
                if (Winner()) {
                    if (currentPlayer == 0)
                        points1++;
                    else
                        points2++;
                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;
                    reset();
                    Board();
                }
                else if (player2Selections.length + player1Selections.length == 9) {
                    reset();
                    Board();
                }
                else {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };
            col.addEventListener('click', handler);
            row.appendChild(col);
            counter++;
        }
        Parent.appendChild(row);
    }
    answers();
}
function d(id) {
    var el = document.getElementById(id);
    return el;
}
function reset() {
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    d('player1').classList.add('selected');
    d('player2').classList.remove('selected');
}
function answers() {
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
}
function myFunction() {
    var txt;
    if (points1 > points2) {
        txt = "Winner: Player1   " + points1 + "/" + points2 + "!";
    }
    else if (points1 == points2) {
        txt = "Winner: Tie   " + points1 + "/" + points2 + "!";
    }
    else {
        txt = "Winner: Player2   " + points2 + "/" + points1 + "!";
    }
    document.getElementById("timer").innerHTML = txt;
}
var endDate = new Date().getTime();
setInterval(function () {
    let now = new Date().getTime();
    let t = endDate - now + 180000;
    if (t >= 0) {
        let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((t % (1000 * 60)) / 1000);
        document.getElementById("timer-mins").innerHTML = ("0" + mins).slice(-2) +
            "<span class='label'>MIN(S)</span>";
        document.getElementById("timer-secs").innerHTML = ("0" + secs).slice(-2) +
            "<span class='label'>SEC(S)</span>";
    }
    else {
        myFunction();
    }
}, 1000);
function Winner() {
    var win = false;
    var playerSelections = new Array();
    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
        playerSelections = player2Selections;
    if (playerSelections.length >= size) {
        for (i = 0; i < winners.length; i++) {
            var sets = winners[i];
            var setFound = true;
            for (r = 0; r < sets.length; r++) {
                var found = false;
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    setFound = false;
                    break;
                }
            }
            if (setFound == true) {
                win = true;
                break;
            }
        }
    }
    return win;
}
window.addEventListener('load', Board);
