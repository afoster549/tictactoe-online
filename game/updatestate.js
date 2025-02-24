const database = require("@replit/database")
const db = new database()

const updatestate = (io, gameId, newState) => {
    db.set(gameId, newState)

    io.to(gameId).emit("state", {
        players: {
            x: newState.players.x[0],
            o: newState.players.o[0]
        },
        board: newState.board,
        turn: newState.turn,
        winner: newState.winner,
        winDirection: newState.winDirection
    })
}

module.exports = updatestate