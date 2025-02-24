const express = require("express")
const router = express.Router()

const database = require("@replit/database")
const db = new database()

router.get("/:id", (req, res) => {
    db.get(req.params.id).then(value => {
        if (value) {
            res.status(200).json({
                players: {
                    x: value.players.x[0],
                    o: value.players.o[0]
                },
                board: value.board
            })
        } else {
            res.status(404).json({
                error: "Game not found"
            })
        }
    })
})

module.exports = router