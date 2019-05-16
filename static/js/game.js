document.addEventListener("keydown", event => {
    if (event.keyCode === 37) {
        piece.position.x--
    } else if (event.keyCode === 39) {
        piece.position.x++
    } else if (event.keyCode === 40) {
        piece.position.y++
    }
});

function piece.prototype.moveDown = function() {
    this.y++;
    this.draw();
};

function piece.prototype.moveLeft = function() {
    this.x--;
    this.draw();
};

function piece.prototype.moveRight = function() {
    this.x++;
    this.draw();
};

function drop() {
    piece.remove();
    piece.moveDown();

}