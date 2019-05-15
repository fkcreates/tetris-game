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


function main(){
    let gameBoard = makeBoard();
    checkGameOver(gameBoard);
}

main();