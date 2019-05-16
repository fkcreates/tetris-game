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

const three = [
    [0,3,0],
    [0,3,3],
    [0,0,3],
]


const playingFigure = {
    pos: {x:0, y:3},
    figure: one,
    status: 'active',
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
            } else if(board[r][c] === 3) {
                colorChooseForCell(r, c, "green");
            }
            setStatus(r,c);
        }
    }
}


Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

let randomMatrix = [1, 54, 2].random();
console.log(randomMatrix);
console.log('kiscica');

function addFigureToBoard(board, figure, offset) {

    for (let r = 0; r < figure.length; r++) {
        for (let c = 0; c < figure.length; c++) {
            if (figure[r][c] !== 0) {
                board[r + offset.x][c + offset.y] = figure[r][c];

                if (offset.x === 18) {
                    /*if (figure === one) {
                        playingFigure.figure = two;
                    } else if (figure === two) {
                        playingFigure.figure = three;
                    } else if (figure === three) {
                        playingFigure.figure = one;
                    }*/
                    playingFigure.figure = [one, two, three].random();
                    console.log(playingFigure.figure);

                    playingFigure.pos.x = 0;
                    playingFigure.pos.y = 3;
                }
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
        setStatusToFixed(gameBoard);
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

document.addEventListener('keydown', movementOnBoard);

update();


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

function movementOnBoard(event){
    if (event.which === 39){
        playingFigure.pos.y++;
    } else if (event.which === 37) {
        playingFigure.pos.y--;
    } else if (event.which === 40) {
         playingFigure.pos.x++;
    } else if (event.which === 32) {
        playingFigure.figure = rotation(playingFigure.figure, 'clockwise');
    }

}



function rotation(matrix, direction) {
    let result = [],
        n = matrix.length,
        m = matrix[0].length,
        i, j, row;

    for (i = 0; i < m; ++i) {
        row = [];
        for (j = 0; j < n; ++j) {
            row.push(direction === 'clockwise' ? matrix[n - j - 1][i] : matrix[j][m - i - 1]);
        }
        result.push(row);

    }
    return result;
}

let gameBoard = makeBoard();



//document.addEventListener('keydown', movementOnBoard);
/*document.addEventListener("keydown", function(event) {
    if (event.keyCode === 37){
        //left
    } else if( event.keyCode === 39){
        //right
    }
});
*/



