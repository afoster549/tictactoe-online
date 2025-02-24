const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

const database = require("@replit/database")
const db = new database()

const rootRoute = require("./routes/root")

app.use("/", rootRoute)

const pagesRoute = require("./routes/pages")

app.use("/", pagesRoute)

const cssRoute = require("./routes/css")

app.use("/css", cssRoute)

const jsRoute = require("./routes/javascript")

app.use("/javascript", jsRoute)

const imgRoute = require("./routes/image")

app.use("/img", imgRoute)

const createRoute = require("./routes/api/create")

app.use("/api/create", createRoute)

const randomRoute = require("./routes/api/random")

app.use("/api/random", randomRoute)

const cleanup = require("./services/cleanup")

setInterval(cleanup, 35000)

// Socket IO

const create = require("./game/create")
const updatestate = require("./game/updatestate")
const checkwin = require("./game/checkwin")

const connection = require("./middleware/connection")

io.use(connection)

io.on("connection", async (socket) => {
    const gameId = socket.handshake.query.gameId
    let game = await db.get(gameId)
    let player = null
    
    if (game.players.x[0] === "None") {
        game.players.x[0] = "Connected"
        game.players.x[1] = socket.id

        player = "x"
    } else if (game.players.o[0] === "None") {
        game.players.o[0] = "Connected"
        game.players.o[1] = socket.id

        player = "o"
    } else {
        console.log("Game is full")
        
        socket.disconnect()
    }
    
    console.log(`User connected to game: ${gameId}`)

    socket.join(gameId)
    
    updatestate(io, gameId, game)
    socket.emit("player", player)

    socket.on("place", async (data) => {
        game = await db.get(gameId)

        if (game.winner === null && game.players.x[0] != "None" && game.players.o[0] != "None" && game.board[data.x][data.y] === "" && game.turn === player) {
            game.board[data.x][data.y] = player

            if (player === "x") {
                game.turn = "o"
            } else {
                game.turn = "x"
            }

            const win = checkwin(game.board)

            if (win) {
                game.winner = win[1]
                game.winDirection = win[0]
            }
            
            updatestate(io, gameId, game)
        }
    })

    socket.on("new-game", () => {
        io.to(gameId).emit("new-game", create())
    })
    
    socket.on("disconnect", async () => {
        game = await db.get(gameId)
        game.players[player] = ["None", ""]

        updatestate(io, gameId, game)
        
        console.log(`User disconnected from game: ${gameId}`)
    })
})

app.get("/api/playercount", (_, res) => {
    res.status(200).json({
        count: io.engine.clientsCount
    })
})

server.listen(3000, () => {
    console.log("Running")
})

// Delete all keys in the database on start up

db.list().then(keys => {
    for (const key of keys) {
        db.delete(key)
    }
})