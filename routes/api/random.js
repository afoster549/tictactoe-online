const express = require("express")
const router = express.Router()

const database = require("@replit/database")
const db = new database()

router.get("/", (_, res) => {
    let found = false
    
    db.list().then(keys => {
        if (keys.length === 0) {
            res.status(200).json({
                id: null
            })
        } else {
            keys.forEach(async key => {
                game = await db.get(key)
                
                if (game.players.x[0] === "None" || game.players.o[0] === "None" && game.public && !found) {
                    res.status(200).json({
                        id: key
                    })

                    found = true
                } else if (!found) {
                    res.status(200).json({
                        id: null
                    })
                }
            })
        }
    })
})

module.exports = router