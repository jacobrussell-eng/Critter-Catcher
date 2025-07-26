// HTML connectors:
const canvas = document.getElementById("canvas");

// Var init:
var winX = window.innerWidth;
var winY = window.innerHeight;
canvas.width = winX;
canvas.height = winY;
var ctx = canvas.getContext('2d');

// Window Resizing:
window.addEventListener('resize', () => {
    winX = window.innerWidth;
    winY = window.innerHeight;
    canvas.width = winX;
    canvas.height = winY;
});

function randomColor() {
  return (
    "rgba(" +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.round(Math.random() * 250) +
    "," +
    Math.ceil(Math.random() * 10) / 10 +
    ")"
  );
}

// Class definition:
class Bug {
    // constructor(x, y, color, radius, moveType) {
    constructor(radius) {
        this.radius = radius;
        this.x = Math.random() * (winX - this.radius * 2) + this.radius;
        this.y = Math.random() * (winY - this.radius * 2) + this.radius;
        this.color = randomColor();
        // this.moveType = moveType;
        this.dx = (Math.random() - 0.5) * 2; // Random horizontal movement speed
        this.dy = (Math.random() - 0.5) * 2; // Random vertical movement speed
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    updatePosition() {
        // switch(this.moveType) {
        //     case '___'
        // }
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off walls
        if (this.x + this.radius > winX || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > winY || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    }
}

// class Ladybug extends Bug {
//     constructor(x, y, radius=30, speed=1.5) {
//         super(x, y, 'red', radius, speed, 'wiggle');
//     }
// }

var bugs = []
for (let i=0; i<100; i++) {
    bugs.push(new Bug(Math.random()*20+10))
}

function Loop() {
    ctx.clearRect(0, 0, winX, winY);
    bugs.forEach(bug => {
        bug.updatePosition();
        bug.draw(ctx);
    });
    requestAnimationFrame(Loop);
}

Loop();