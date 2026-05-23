// sources used:
// stopwatch logic — https://www.geeksforgeeks.org/javascript/how-to-create-stopwatch-using-html-css-and-javascript/
// closure fix for loop variables — https://www.w3schools.com/js/js_function_closures.asp
// three equals signs (===) checks both the value and the data type of operands


// the puzzle the player is currently solving (loaded from puzzles.js)
let currentPuzzle = null;

// how many letters each word has — depends on which level they picked
let wordLength = 4;

// tracks whether each of the 7 steps is 'empty', 'correct', or 'wrong'
let stepStatuses = [];

// tracks how many wrong guesses per step so we know if they got it first try
let stepAttempts = Array(7).fill(0);

// current streak = how many correct first-try answers in a row right now
// best streak = the highest the current streak has ever been (saved across sessions)
let currentStreak = 0;
let bestStreak = 0;

// timer variables — count goes 0-99, then rolls over into seconds, etc.
let hour = 0, minute = 0, second = 0, count = 0;
let timerRunning = false;

// grab the start/pause buttons so we can enable/disable them
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');


// takes the raw text from puzzles.js and turns it into an array of puzzle objects.
// each block is separated by a blank line. first line = start word, then 7 lines
// of "clue|ANSWER" pairs.
function parsePuzzles(text) {
    let puzzles = [];

    // split on blank lines to get individual puzzle blocks
    //learned RegEx from: https://www.geeksforgeeks.org/java/regular-expressions-in-java/
    let blocks = text.trim().split("\n\n").filter(function(block) { return block.trim() != ""; });

    for (let b = 0; b < blocks.length; b++) {
        let lines = blocks[b].trim().split('\n');

        // need at least 8 lines: 1 start word + 7 clue/answer lines
        if (lines.length < 8) continue;

        let start = lines[0].trim().toUpperCase();
        let clues = [];
        let answers = [];

        // each line after the first is "clue text|ANSWER"
        for (let i = 1; i <= 7; i++) {
            let parts = lines[i].split('|');
            clues.push(parts[0].trim());
            answers.push(parts[1].trim().toUpperCase());
        }

        puzzles.push({
            id: b + 1,
            start: start,
            clues: clues,
            answers: answers
        });
    }
    return puzzles;
}


// runs once when the page loads — sets up the whole game
window.onload = function () {
    // check if there's a saved best streak from a previous session
    let savedBest = localStorage.getItem('bestStreak');
    if (savedBest !== null) {
        bestStreak = parseInt(savedBest);
        document.getElementById('best-streak').textContent = bestStreak;
    }

    // hook up the start and pause buttons
    startBtn.onclick = startTimer;
    stopBtn.onclick = stopTimer;

    // check if this is a daily challenge
    let isDaily = localStorage.getItem('dailyChallenge') === 'true';
    localStorage.removeItem('dailyChallenge');

    // figure out which level they picked on the home page (defaults to 2)
    let level = localStorage.getItem('selectedLevel') || '2';
    let puzzleText;

    if (isDaily && typeof DAILY_CHALLENGE !== 'undefined' && DAILY_CHALLENGE) {
        // daily challenge mode — use the pre-generated Level 3 puzzle
        puzzleText = DAILY_CHALLENGE;
        wordLength = 5;
    }
    // level 1 = easy (3-letter words), level 2 = medium (4-letter), level 3 = hard (5-letter)
    else if (level == '1') {
        puzzleText = PUZZLES_LEVEL1;
        wordLength = 3;
    }
    else if (level == '3') {
        puzzleText = PUZZLES_LEVEL3;
        wordLength = 5;
    }
    else {
        puzzleText = PUZZLES_LEVEL2;
        wordLength = 4;
    }

    // turn the text into actual puzzle objects
    let allPuzzles = parsePuzzles(puzzleText);

    if (isDaily && allPuzzles.length > 0) {
        // daily challenge always uses the first (and only) puzzle
        currentPuzzle = allPuzzles[0];
    }
    else {
        // pick a random puzzle, but don't repeat the one they just played
        let lastPlayed = parseInt(localStorage.getItem('lastPuzzlePlayed') || '-1');
        let puzzleIndex;
        if (allPuzzles.length === 1) {
            puzzleIndex = 0;
        }
        else {
            do {
                puzzleIndex = Math.floor(Math.random() * allPuzzles.length);
            } while (puzzleIndex === lastPlayed);
        }

        // remember which one we picked so we don't repeat it next time
        localStorage.setItem('lastPuzzlePlayed', puzzleIndex);

        currentPuzzle = allPuzzles[puzzleIndex];
    }

    // update the input boxes to match the word length for this level
    for (let i = 1; i <= 7; i++) {
        document.getElementById('step' + i).maxLength = wordLength;
    }

    // load the puzzle onto the board and start the clock
    loadPuzzle();
    startTimer();
};


// resets everything and puts the current puzzle on the board
function loadPuzzle() {
    // clear out all the tracking arrays
    stepStatuses = Array(7).fill('empty');
    stepAttempts = Array(7).fill(0);
    currentStreak = 0;
    document.getElementById('current-streak').textContent = '0';

    // show the starting word in the yellow box
    document.getElementById('clue-current-word').textContent = currentPuzzle.start;

    // hide the "next" button — it only shows up after they finish
    document.getElementById('next-btn').style.display = 'none';

    // clear all 7 input boxes, disable them, and attach the checking logic
    for (let i = 1; i <= 7; i++) {
        let input = document.getElementById('step' + i);
        input.value = '';
        input.disabled = true;
        input.placeholder = 'Answer';
        input.className = '';
        input.oninput = makeChecker(i);
    }

    // only enable the first box — the rest unlock as you solve each step
    document.getElementById('step1').disabled = false;

    // show the first clue
    updateClueBox();

    // put the cursor in the first box so they can start typing immediately
    document.getElementById('step1').focus();
}


// this is a closure trick — we need each input to know its own step number.
// if we used i directly in the loop, they'd all share the same variable
// and it would always be 8 by the time anyone types anything.
// wrapping it in a function "freezes" the value of i for each input.
function makeChecker(i) {
    return function () {
        checkStep(i);
    };
}


// looks at which steps are done and updates the yellow info box.
// walks through the steps in order — once it finds one that's not correct,
// that's the next clue to show.
function updateClueBox() {
    let currentWord = currentPuzzle.start;
    let nextStep = 0;

    for (let i = 0; i < 7; i++) {
        if (stepStatuses[i] == 'correct') {
            currentWord = currentPuzzle.answers[i];
            nextStep = i + 1;
        }
        else 
            break;
    }

    // update the word display
    document.getElementById('clue-current-word').textContent = currentWord;

    // show the next clue, or "Done!" if they finished all 7
    if (nextStep >= 7) {
        document.getElementById('clue-text').textContent = 'Done!';
    }
    else {
        document.getElementById('clue-text').textContent = currentPuzzle.clues[nextStep];
    }
}


// updates the current streak after a correct answer.
// if the step was answered on the first try, the streak continues;
// otherwise it resets (wrong answers already set currentStreak to 0).
function updateStreakBox(stepNum) {
    // if this step was first-try correct, extend the streak
    if (stepAttempts[stepNum - 1] == 0) {
        currentStreak++;
    }
    else {
        // they got it right eventually but not first try — streak stays broken
        currentStreak = 0;
    }

    // update best if we just beat it, and save to localStorage so it persists
    if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        localStorage.setItem('bestStreak', bestStreak);
    }

    // update the display
    document.getElementById('current-streak').textContent = currentStreak;
    document.getElementById('best-streak').textContent = bestStreak;
}


// called every time the player types a letter in any input box.
// waits until they've typed the full word before checking.
function checkStep(stepNum) {
    let input = document.getElementById('step' + stepNum);
    let userVal = input.value.trim().toUpperCase();
    let correct = currentPuzzle.answers[stepNum - 1];

    // don't check until they've typed enough letters
    if (userVal.length < wordLength) {
        input.className = '';
        return;
    }

    if (userVal == correct) {
        // correct — lock the input, turn it green, move on
        input.value = correct;
        input.disabled = true;
        input.className = 'correct';
        stepStatuses[stepNum - 1] = 'correct';
        updateClueBox();
        updateStreakBox(stepNum);

        // unlock and focus the next box so they can keep typing
        if (stepNum < 7) {
            let nextInput = document.getElementById('step' + (stepNum + 1));
            nextInput.disabled = false;
            nextInput.focus();
        }

        checkIfComplete();
    }
    else {
        // wrong — turn it red, count the attempt, break the streak
        input.className = 'wrong';
        stepStatuses[stepNum - 1] = 'wrong';
        stepAttempts[stepNum - 1]++;
        currentStreak = 0;
        document.getElementById('current-streak').textContent = currentStreak;
    }
}


// checks if all 7 steps are correct — if so, the puzzle is done
function checkIfComplete() {
    for (let i = 0; i < stepStatuses.length; i++) {
        if (stepStatuses[i] != 'correct')
            return;
    }

    // puzzle complete — stop the clock and show the next button
    stopTimer();
    startBtn.disabled = true;
    stopBtn.disabled = true;
    document.getElementById('next-btn').style.display = 'inline-block';

    // save the stats so the congratulations page can show them
    localStorage.setItem('lastTime', getTimeString());
    localStorage.setItem('lastStreak', currentStreak);
    localStorage.setItem('lastBestStreak', bestStreak);
}


// sends the player to the congratulations page
function goToCongratulations() {
    location.replace('congratulations.html');
}

// sends the player back to the home page
function nextPage() {
    location.replace('index.html');
}


// --- timer logic ---
// the timer works by calling tick() every 10ms using setTimeout.
// count goes from 0 to 99, then rolls over into seconds, minutes, hours.
// we use setTimeout instead of setInterval because it's easier to stop cleanly.

function startTimer() {
    timerRunning = true;
    tick();
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // re-enable any input box that was disabled by pause
    for (let i = 1; i <= 7; i++) {
        let input = document.getElementById('step' + i);
        if (input.dataset.pausedActive === 'true') {
            input.disabled = false;
            input.focus();
            delete input.dataset.pausedActive;
        }
    }
}

function stopTimer() {
    timerRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;

    // disable the currently active input box while paused
    for (let i = 1; i <= 7; i++) {
        let input = document.getElementById('step' + i);
        if (!input.disabled) {
            input.disabled = true;
            input.dataset.pausedActive = 'true';
        }
    }
}

// resets the timer back to 00:00:00:00
function resetTimer() {
    timerRunning = false;
    hour = 0; minute = 0; second = 0; count = 0;
    document.getElementById('hr').innerHTML = '00';
    document.getElementById('min').innerHTML = '00';
    document.getElementById('sec').innerHTML = '00';
    document.getElementById('count').innerHTML = '00';
}

// returns the time as a readable string like "01:23:45"
function getTimeString() {
    return pad(hour) + ':' + pad(minute) + ':' + pad(second);
}

// pads single digits with a leading zero so 7 becomes "07"
function pad(n) {
    return String(n).padStart(2, '0');
}

// runs every 10ms — increments the timer and updates the display
function tick() {
    if (!timerRunning)
        return;

    count++;
    if (count === 100)  { second++; count = 0;  }
    if (second === 60)  { minute++; second = 0; }
    if (minute === 60)  { hour++;   minute = 0; }

    document.getElementById('hr').innerHTML = pad(hour);
    document.getElementById('min').innerHTML = pad(minute);
    document.getElementById('sec').innerHTML = pad(second);
    document.getElementById('count').innerHTML = pad(count);

    // schedule the next tick
    setTimeout(tick, 10);
}
