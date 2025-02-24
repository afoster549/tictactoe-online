const express = require("express")
const router = express.Router()

const path = require("path")
const fs = require("fs")

router.get("/:file", (req, res) => {
    if (fs.existsSync(`./webpages/img/${req.params.file}.png`)) {
        file = path.join(__dirname, `../webpages/img/${req.params.file}.png`)
        
        res.status(200).sendFile(file)
    }
    // else {
    //     res.status(404).send("404 not found!")
    // }
})

module.exports = router
