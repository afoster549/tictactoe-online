const database = require("@replit/database")
const db = new database()

const connection = async (socket, next) => {
    const id = socket.handshake.query.gameId
    
    if (id && id.length === 6 && await db.get(id) != null) {
        return next()
    } else {
        socket.disconnect()
    }
}

module.exports = connection