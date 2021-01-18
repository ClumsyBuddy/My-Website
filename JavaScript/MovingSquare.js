var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 225, 225);
    myGameArea.start();
}

var myGameArea = {
    canvas: document.getElementById("PricingCanvas"),
    start: function() {
        this.canvas.width = window.innerWidth * 0.90;
        this.canvas.height = window.innerHeight * 0.90;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop: function() {
        clearInterval(this.interval);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    Boundaries: function(Entity) {
        if (Entity.x < 0) {
            Entity.x = 0;
        }
        if (Entity.x > myGameArea.canvas.width) {
            Entity.x = myGameArea.canvas.width;
        }
        if (Entity.y < 0) {
            Entity.y = 0;
        }
        if (Entity.y > myGameArea.canvas.height) {
            Entity.y = myGameArea.canvas.height;
        }
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.WindowResize = function() {
        myGameArea.canvas.width = window.innerWidth * 0.90;
        myGameArea.canvas.height = window.innerHeight * 0.90;
    }
}

function updateGameArea() {
    myGamePiece.WindowResize();
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[65] || myGameArea.keys && myGameArea.keys[37]) { myGamePiece.moveAngle = -3; }
    if (myGameArea.keys && myGameArea.keys[68] || myGameArea.keys && myGameArea.keys[39]) { myGamePiece.moveAngle = 3; }
    if (myGameArea.keys && myGameArea.keys[87] || myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speed = 5; }
    if (myGameArea.keys && myGameArea.keys[83] || myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speed = -5; }
    myGamePiece.newPos();
    myGameArea.Boundaries(myGamePiece);
    myGamePiece.update();

}