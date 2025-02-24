const checkwin = (board) => {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            return [`column${i}`, board[i][0]]
        }
    }
    
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            return [`row${i}`, board[0][i]]
        }
    }
    
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        return ["topLeftBottomRightDiagonal", board[0][0]]
    }
    
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        return ["bottomLeftTopRightDiagonal", board[0][2]]
    }

    if (board.flat().every(x => x !== "")) {
        return ["draw", "draw"]
    }
    
    return null
}

module.exports = checkwin