function makeBoard(){
    const ROW = 20;
    const COL = COLUMN = 10;
    let board = [];

    for (let r = 0; r <= ROW; r++) {
        board[r] = [];
        for (let c = 0; c <= COL; c++) {
            board[r][c] = 0;
        }
    }
    return board
}

makeBoard();
