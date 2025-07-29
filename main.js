// HTML connectors:
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const imgEl = document.getElementById('magnified');

// Var init:
let winX = window.innerWidth;
let winY = window.innerHeight;
canvas.width = winX;
canvas.height = winY;
let hoveredBug = null;

// Window Resizing:
window.addEventListener('resize', () => {
    winX = window.innerWidth;
    winY = window.innerHeight;
    canvas.width = winX;
    canvas.height = winY;
});

// Image preloading:
let bugImages = {
    'red': 'assets/red_beetle.gif',
    'blue': 'assets/blue_beetle.gif',
    'green': 'assets/green_beetle.gif',
    'yellow': 'assets/yellow_beetle.gif'
};

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
    constructor(radius, type, color) {
        this.radius = radius;
        this.type = type;
        this.x = Math.random() * (winX - this.radius * 2) + this.radius;
        this.y = Math.random() * (winY - this.radius * 2) + this.radius;
        this.color = color || randomColor();
        // this.moveType = moveType;
        this.dx = (Math.random() - 0.5) * 5; // Random horizontal movement speed
        this.dy = (Math.random() - 0.5) * 3; // Random vertical movement speed
        this.isHovered = false;
    }
    draw(ctx) {
        // if (this.isHovered && bugImages[this.type]) {
        //     ctx.drawImage(bugImages[this.type], this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        // } else {
        if (!this.isHovered) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    updatePosition() {
        // switch(this.moveType) {
        //     case '___'
        // }

        if (this.isHovered) {
            return;
        }

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

// Bug Types:
class RedBug extends Bug {
    constructor() {
        super(30, 'red', 'red');
    }
}
class BlueBug extends Bug {
    constructor() {
        super(35, 'blue', 'blue');
    }
}
class GreenBug extends Bug {
    constructor() {
        super(40, 'green', 'green');
    }
}
class YellowBug extends Bug {
    constructor() {
        super(35, 'yellow', 'yellow');
    }
}

let bugs = []
// for (let i=0; i<100; i++) {
//     bugs.push(new Bug(Math.random()*20+10))
// }
const bugClasses = [RedBug, BlueBug, GreenBug, YellowBug];
for (let i = 0; i < 70; i++) {
    const RandomBugClass = bugClasses[Math.floor(Math.random() * bugClasses.length)];
    bugs.push(new RandomBugClass());
}

// Mouse move event listener for hover effect
canvas.addEventListener('mousemove', (event) => {
    // Get mouse coordinates relative to the canvas:
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    let newHoveredBug = null;
    // Check what's being hovered over:
    for (let i = bugs.length - 1; i >= 0; i--) {
        const bug = bugs[i];
        const distance = Math.sqrt(
            (mouseX - bug.x) ** 2 + (mouseY - bug.y) ** 2
        );
        if (distance < bug.radius) {
            newHoveredBug = bug;
            break;
        }
    }
    // Update current hovered accordingly:
    if (newHoveredBug !== hoveredBug) {
        if (hoveredBug) {
            hoveredBug.isHovered = false;
        }
        if (newHoveredBug) {
            newHoveredBug.isHovered = true;
            imgEl.src = bugImages[newHoveredBug.type];
            imgEl.style.width = `${newHoveredBug.radius * 3}px`;
            imgEl.style.height = `${newHoveredBug.radius * 3}px`;
            imgEl.style.left = `${newHoveredBug.x}px`;
            imgEl.style.top = `${newHoveredBug.y}px`;
            imgEl.style.display = 'block'; // Show the GIF
        } else {
            imgEl.style.display = 'none'; // Hide the GIF
        }
        hoveredBug = newHoveredBug;
    }

    bugs.forEach(bug => {
        // Calculate distance from mouse to bug center:
        const distance = Math.sqrt(
            (mouseX - bug.x) ** 2 + (mouseY - bug.y) ** 2
        );
        bug.isHovered = distance < bug.radius;
    });
});

// Run animations:
function Loop() {
    ctx.clearRect(0, 0, winX, winY);
    bugs.forEach(bug => {
        bug.updatePosition();
        bug.draw(ctx);
    });
    requestAnimationFrame(Loop);
}
Loop();