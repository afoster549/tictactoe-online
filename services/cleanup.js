const database = require("@replit/database")
const db = new database()

const cleanup = () => {
    console.log("Cleaning up...")
    
    db.list().then(keys => {
        for (let i = 0; i < keys.length; i++) {
            db.get(keys[i]).then(value => {
                if (
                    Date.now() - value.createdAt >= 30000
                    && value.players.x[0] === "None"
                    && value.players.o[0] === "None"
                ) {
                    db.delete(keys[i])
                }
            })
        }
    })
}

module.exports = cleanup