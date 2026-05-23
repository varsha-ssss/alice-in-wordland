/*saveImage3.html, Mr. DeRuiter*/

// takes the player to the game page
function nextPage(){
    location.replace('gamepage.html');
}

// takes the player to the instructions page
function instructionsPage(){
    location.replace('instructions.html');
}

// starts the daily challenge — sets level to 3 and flags it as daily mode
function dailyChallenge(){
    localStorage.setItem('selectedLevel', '3');
    localStorage.setItem('dailyChallenge', 'true');
    location.replace('gamepage.html');
}

// returns today's date as YYYY-MM-DD
function getTodayString() {
    return new Date().toISOString().split('T')[0];
}

// runs when the home page loads — sets up the level buttons
window.onload = function() {
    // disable daily challenge button if already completed today
    var dailyBtn = document.querySelector('.daily-btn');
    var lastDaily = localStorage.getItem('dailyChallengeCompleted');
    if (lastDaily === getTodayString()) {
        dailyBtn.disabled = true;
        dailyBtn.textContent = 'Challenge Done!';
    }
    var btnContainer = document.getElementById("myDIV");
    var btns = btnContainer.getElementsByClassName("but");

    // add a click handler to each level button (1, 2, 3)
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            // remove the "active" style from whichever button was selected before
            var current = document.getElementsByClassName("active");
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }

            // highlight this button and enable the play button
            this.className += " active";
            document.querySelector(".button").disabled = false;

            // save which level they picked so the game page knows
            // also reset the puzzle index so they start fresh
            var level = this.textContent.trim();
            localStorage.setItem('selectedLevel', level);
            localStorage.setItem('currentPuzzleIndex', '0');
        });
    }
};
