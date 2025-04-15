let timer = 60;
let score = 0;
let newHit = 0;
let intervalId;

function scoreInc() {
    score += 10;
    document.querySelector("#scoreVal").innerText = score;
}

function makeBubble() {
    let bubble = '';
    for (let i = 1; i <= 168; i++) {
        let random = Math.floor(Math.random() * 10);
        bubble += `<div class="bubble">${random}</div>`;
    }
    document.querySelector("#pbtm").innerHTML = bubble;
}

function getNewHit() {
    newHit = Math.floor(Math.random() * 10);
    document.querySelector("#hitVal").innerText = newHit;
}

function startGame() {
    score = 0;
    timer = 60;
    document.querySelector("#scoreVal").innerText = score;
    document.querySelector("#timeVal").innerText = timer;

    makeBubble();
    getNewHit();

    clearInterval(intervalId); // Clear previous interval if any
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

// Bubble click handler
document.querySelector("#pbtm").addEventListener("click", function (details) {
    let clicked = Number(details.target.textContent);
    if (clicked === newHit) {
        scoreInc();
        makeBubble();
        getNewHit();
    }
});

// Start button
document.querySelector("#start").addEventListener("click", startGame);
