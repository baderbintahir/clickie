var score; // to store the current score
var duration = 5; // 10 seconds
var startTime; // start time
var ended = true; // boolean indicating if game is ended
var rank; //rank given according to score
// we get DOM References for some HTML elements
var timerTxt = document.getElementById("timer-span");
var scoreTxt = document.getElementById("score-span");
var clicksTxt = document.getElementById("clicks-span");
var startBtn = document.getElementById("start");
var rankContainer = document.querySelector(".rank-wrapper")
var closeBtn = document.querySelector("#close")
var rankTxt = document.querySelector(".rank")
var performance = document.querySelector(".performance")
var clickArea = document.getElementById("clickarea");

// we define two functions for showing or hiding a HTML element
var show = function (elem) {
    elem.style.display = 'inline';
};

var hide = function (elem) {
    elem.style.display = 'none';
};

// Method called when the game starts
function startGame() {
    hide(startBtn);
    score = -1;
    ended = false;
    // we get start time
    startTime = new Date().getTime();

    // we create a timer with the setInterval method
    var timerId = setInterval(function () {
        var total = (new Date().getTime() - startTime) / 1000;

        // while total lower than duration, we update timer and the clicks by seconds
        if (total < duration) {
            timerTxt.textContent = total.toFixed(3);
            clicksTxt.textContent = (score / total).toFixed(2);
        } else {
            // otherwise, game is ended, we clear interval and we set game as ended
            ended = true;
            clearInterval(timerId);
            // we call the end game method
            endGame();
        }
    }, 1);
}

// end game method
function endGame() {
    // we write final stats
    var clicksBySeconds = (score / duration).toFixed(2);
    timerTxt.textContent = duration.toFixed(3);
    clicksTxt.textContent = clicksBySeconds;
    // we show start button to play an other game
    show(startBtn);

    // we display result to the user in delayed mode 
    //to update DOM elements just before the alert
    setTimeout(function () {
        if(score < 20){
            rank = 'Turtle'
        }
        if(score >= 20 && score < 30){
            rank = 'Mouse'
        }
        if(score >= 30 && score < 50){
            rank = 'Rabit'
        }        

        rankTxt.innerHTML = `Your rank is ${rank}!`
        performance.innerHTML = `You made ${score} clicks in ${duration} seconds. Your Clicks/Second rate is ${clicksBySeconds}.`

        rankContainer.style.visibility = 'visible'
    }, 10);
}

closeBtn.addEventListener("click", () => {
    score = 0
    rankContainer.style.visibility = 'hidden'
})

// we set a click event listener on the start button
startBtn.addEventListener("click", function (e) {
    startGame();
});

// we add a click event listener on the click area div to update the score when the user will click
clickArea.addEventListener("click", function (e) {
    if (!ended) {
        score++;
        scoreTxt.textContent = score;
    }
});