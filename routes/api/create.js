const express = require("express")
const router = express.Router()

const create = require("../../game/create")

router.get("/", (_, res) => {
    res.status(200).json({
        id: create()
    })
})

module.exports = router