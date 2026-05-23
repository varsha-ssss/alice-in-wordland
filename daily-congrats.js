// runs when the page loads — shows daily challenge stats
window.onload = function () {
    let time = localStorage.getItem('lastTime');
    let streak = localStorage.getItem('lastStreak');
    let dayStreak = parseInt(localStorage.getItem('dailyStreak') || '0');

    if (time) document.getElementById('final-time').textContent = time;
    if (streak) document.getElementById('final-streak').textContent = streak;
    document.getElementById('daily-streak').textContent = dayStreak;

    // show a message based on the day streak
    let msg = document.getElementById('streak-message');
    if (dayStreak >= 7) {
        msg.textContent = dayStreak + '-day streak! You are unstoppable!';
    } else if (dayStreak >= 3) {
        msg.textContent = dayStreak + '-day streak! Keep it up!';
    } else if (dayStreak === 2) {
        msg.textContent = '2-day streak! Nice consistency!';
    } else {
        msg.textContent = 'Great job completing today\'s challenge!';
    }

    // kick off the confetti celebration
    launchConfetti();
};

// back to the main menu
function goHome() {
    location.replace('index.html');
}

// shoots confetti from both sides of the screen for 5 seconds
function launchConfetti() {
    var end = Date.now() + (5 * 1000);
    var colors = ['#e8a020', '#FDF8B6', '#FFFFFF'];

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
