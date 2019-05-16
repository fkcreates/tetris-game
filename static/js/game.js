const one = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

const two = [
    [0,2,2],
    [0,2,0],
    [0,2,0],
];

const playingFigure = {
    pos: {x:0, y:3},
    figure: one,
    status: 'active'
};

function makeBoard(){
    const ROW = 20;
    const COL = 10;
    let board = [];

    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] = 0;
            colorChooseForCell(r, c, "white");
            setStatus(r,c);
        }
    }

    return board
}


function checkGameOver(gameBoard){
    let counter = 0;
    let checkedRows = 5;
    let colNum = 10;
    for (let col = 0; col < colNum; col++) {
        for (let row = 0; row < checkedRows; row++) {
            if (gameBoard[col][row] === 1) {
                counter += 1;
                if (counter === checkedRows) {
                    alert("Game Over!");
                    return 0;
                }
            }
        }
        counter = 0;
    }
}


function getCellByCoordinate(x, y) {
    return document.querySelector(`.game-cell[data-coordinate-x="${y}"][data-coordinate-y="${x}"]`)
}


function colorChooseForCell(x, y, color){
    let actualCell = getCellByCoordinate(x, y);
    actualCell.style.backgroundColor = color;
}


function setStatus(x, y) {
    let actualCell = getCellByCoordinate(x, y);
    if (actualCell.style.backgroundColor !== "white" && actualCell.dataset.status !== "fixed") {
        actualCell.dataset.status = 'active';
    } else {
        actualCell.dataset.status = 'empty';
    }
}


function coloringCells(board){
    for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 10; c++) {
            if(board[r][c] === 1){
                colorChooseForCell(r, c, "red");
            } else if(board[r][c] === 2) {
                colorChooseForCell(r, c, "blue");
            }
            setStatus(r,c);
        }
    }
}


function addFigureToBoard(board, figure, offset){

    for (let r = 0; r < figure.length; r++) {
        for (let c = 0; c < figure.length; c++) {
            if (figure[r][c] !== 0) {
                board[r + offset.x][c + offset.y] = figure[r][c];
            }
        }
    }
}


function draw(){
    let gameBoard = makeBoard();
    addFigureToBoard(gameBoard, playingFigure.figure, playingFigure.pos);
    coloringCells(gameBoard);
}


function main(){
    let gameBoard = makeBoard();
    coloringCells(gameBoard);
}


let dropStart = Date.now();
function update(){
    draw();
    let now = Date.now();
    let delta = now - dropStart;
    if(delta > 500){
        moveDown(gameBoard);
        dropStart = Date.now();
    }
    requestAnimationFrame(update);
}


function moveDown(gameBoard) {
    playingFigure.pos.x++;
    if (collisionDetection(gameBoard, playingFigure.figure, playingFigure.pos)) {
        playingFigure.pos.x--;
        setStatusToFixed(gameBoard)
        console.log('collided');
    }
}


function collisionDetection(board, figure, offset) {
    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure.length; j++) {
            if (figure[i][j] !== 0) {
                if (i+offset.x >= 20){
                    return true
                }
                if (board[i+offset.x][j+offset.y] !== 0) {
                    return true
                }
            }
        }
    }
    return false;
}


function setStatusToFixed(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let actualCell = getCellByCoordinate(i, j);
            if (actualCell.status === "active") {
                actualCell.status = "fixed"
            }
        }
    }
}


let gameBoard = makeBoard();


update();





