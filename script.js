let timer = 60;
let score = 0;
let newHit = 0;
let intervalId;

// Function to increase score
function scoreInc() {
    score += 10;
    document.querySelector("#scoreVal").innerText = score;
}

// Function to generate bubbles
function makeBubble() {
    let bubble = '';
    for (let i = 1; i <= 168; i++) {
        let random = Math.floor(Math.random() * 10);
        bubble += `<div class="bubble">${random}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = bubble;
}

// Function to get a new number to hit
function getNewHit() {
    newHit = Math.floor(Math.random() * 10);
    document.querySelector("#hitVal").innerText = newHit;
}

// Function to start the game
function startGame() {
    score = 0;
    timer = 60;
    document.querySelector("#scoreVal").innerText = score;
    document.querySelector("#timeVal").innerText = timer;

    makeBubble();
    getNewHit();

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.querySelector("#timeVal").innerText = timer;
        } else {
            clearInterval(intervalId);
            document.querySelector("#pbtm").innerHTML = `<h1 class="OVER">Game Over</h1>`;
        }
    }, 1000);
}

// Event listener for clicking bubbles
document.querySelector("#pbtm").addEventListener("click", function (details) {
    let clicked = Number(details.target.textContent);

    if (clicked === newHit && details.target.classList.contains("bubble")) {
        // Play pop sound
        let popSound = document.getElementById("popSound");
        if (popSound) {
            popSound.currentTime = 0;
            popSound.play();
        }

        // Add pop animation
        let bubble = details.target;
        bubble.classList.add("pop-effect");

        // Delay to let animation play before refreshing bubbles
        setTimeout(() => {
            scoreInc();
            makeBubble();
            getNewHit();
        }, 250);
    }
});

// Start game on button click
document.querySelector("#start").addEventListener("click", startGame);
