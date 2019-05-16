const one = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

const playingFigure = {
    pos: {x:0, y:3},
    figure: one,
};

function makeBoard(){
    const ROW = 20;
    const COL = 10;
    let board = [];

    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] = 0;
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
                    alert("Game Over!")
                    return 0;
                }
            }
        }
        counter = 0;
    }
}


function getCellByCoordinate(x, y) {
    return document.querySelector(`.game-cell[data-coordinate-x="${x}"][data-coordinate-y="${y}"]`)
}


function colorChooseForCell(i, j, color){
    let actualCell = getCellByCoordinate(i, j);
    actualCell.style.backgroundColor = color;
}


function coloringCells(board){
    for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 10; c++) {
            if (board[c][r] === 1) {
                colorChooseForCell(r, c, "red");
            }else if(board[c][r] === 2){
                colorChooseForCell(r, c, "blue");
            }
        }
    }
}


function addFigureToBoard(board, figure, offset){

    for (let i = 0; i < figure.length; i++) {
        for (let j = 0; j < figure.length; j++) {
            if (figure[i][j] !== 0) {
                board[i+offset.x][j+offset.y] = figure[i][j];
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


    //checkGameOver(gameBoard);
    //coloringFigures();
}


let dropStart = Date.now();
function update(){
    draw();
    let now = Date.now();
    let delta = now - dropStart;
    console.log(delta);
    if(delta > 1000){
        playingFigure.pos.x++;
        dropStart = Date.now();
    }
    requestAnimationFrame(update);
}



update();













/*document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37){
        //left
    } else if( event.keyCode === 39){
        //right
    }
});*/
