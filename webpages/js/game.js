const gameId = new URLSearchParams(window.location.search).get("id")

if (!gameId) {
    window.location.href = "/join"
}

document.getElementById("game-id").innerText = gameId

let gameState = {
    players: {
        x: "None",
        o: "None"
    },
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    winner: null,
    winDirection: null
}

const winDirections = {
    row0: [0, 0, -105],
    row1: [0, 0, 0],
    row2: [0, 0, 105],
    column0: [90, -105, 0],
    column1: [90, 0, 0],
    column2: [90, 105, 0],
    topLeftBottomRightDiagonal: [45, 0, 0],
    bottomLeftTopRightDiagonal: [-45, 0, 0]
}

let playing = false
let player = null

const socket = io(
    "https://78fe919e-472d-428e-ad60-52e010eca6f1-00-1e082tjef424u.kirk.replit.dev",
    {
        query: `gameId=${gameId}`
    }
)

socket.on("connect", () => {
    console.log("Connected")
})

socket.on("disconnect", () => {
    window.location = "/"
})

socket.on("state", (data) => {
    if (gameState.board != data.board) {
        updateBoard(data)
    }

    gameState = data

    document.getElementById("player-x").innerText = `Player X: ${gameState.players.x}`
    document.getElementById("player-o").innerText = `Player O: ${gameState.players.o}`
    
    console.log(data)
})

socket.on("player", (data) => {
    player = data
    document.getElementById("player-indicator").innerText = data.toUpperCase()
})

function updateBoard(newState) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameState.board[i][j] != newState.board[i][j]) {
                const image = document.createElement("img")
                image.src = `/img/${newState.board[i][j]}`

                document.getElementById(`${i}-${j}`).appendChild(image)
            }
        }
    }
    
    if (newState.winDirection == "draw") {
        document.getElementById("title").innerText = "Draw"
    } else if (newState.winDirection != null) {
        const winDirection = winDirections[newState.winDirection]
        
        const line = document.getElementById("line")

        line.style.rotate = `${winDirection[0]}deg`
        line.style.marginLeft = `${winDirection[1]}px`
        line.style.marginTop = `${winDirection[2]}px`
        
        line.style.display = "block"

        document.getElementById("title").innerText = `${newState.winner.toUpperCase()} wins!`
    }

    if (newState.winner != null) {
        document.getElementById("new-game").classList.remove("btn-unavailable")
        document.getElementById("new-game").classList.add("btn-regular")
    }
}

function place(xPos, yPos) {
    socket.emit("place", {
        x: xPos,
        y: yPos
    })
}

// New game

document.getElementById("new-game").addEventListener("click", () => {
    if (gameState.winner != null) {
        socket.emit("new-game")
    }
})

socket.on("new-game", (newId) => {
    window.location.href = `/game?id=${newId}`
})