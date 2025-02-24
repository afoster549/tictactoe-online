const database = require("@replit/database")
const db = new database()

function generateId() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let id = ""

    for (let i = 0; i < 6; i++) {
        id += alphabet[Math.floor(Math.random() * alphabet.length)]
    }

    return id
}

const create = () => {
    const id = generateId()

    db.set(id, {
        public: true,
        players: {
            x: ["None", ""],
            o: ["None", ""]
        },
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        turn: "x",
        winner: null,
        winDirection: null,
        createdAt: Date.now()
    })

    return id
}

module.exports = create