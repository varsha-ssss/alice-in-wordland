// runs when the page loads — grabs the stats saved by the game page
// and puts them on screen so the player can see how they did
window.onload = function () {
    let time = localStorage.getItem('lastTime');
    let streak = localStorage.getItem('lastStreak');
    let best = localStorage.getItem('lastBestStreak');

    if (time) document.getElementById('final-time').textContent = time;
    if (streak) document.getElementById('final-streak').textContent = streak;
    if (best) document.getElementById('final-best').textContent = best;

    // kick off the confetti celebration
    launchConfetti();
};

// go back to the game page — it'll pick a new random puzzle,
// same level they were playing before
function playAgain() {
    location.replace('gamepage.html');
}

// back to the main menu
function goHome() {
    location.replace('index.html');
}

// shoots confetti from both sides of the screen for 5 seconds
// code from https://codepen.io/murtazajafari/pen/eYNrWgd
function launchConfetti() {
	// run for 5 seconds
	var end = Date.now() + (5 * 1000);

	// alice in wonderland-ish colors: blue, light yellow, white
	var colors = ['#98BFEE', '#FDF8B6', '#FFFFFF'];

	// animation loop — fires confetti from left and right each frame
	(function frame() {
		// burst from the left side, angled right
		confetti({
			particleCount: 5,     // 5 pieces per frame
			angle: 60,            // aim to the right
			spread: 55,           // how wide the burst spreads
			origin: {
				x: 0              // starts from left edge
			},
			colors: colors
		});

		// burst from the right side, angled left
		confetti({
			particleCount: 5,     // 5 pieces per frame
			angle: 120,           // aim to the left
			spread: 55,           // how wide the burst spreads
			origin: {
				x: 1              // starts from right edge
			},
			colors: colors
		});

		// keep going until 5 seconds are up
		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	}());
}
