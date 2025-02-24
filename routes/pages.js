const express = require("express")
const router = express.Router()

const path = require("path")
const fs = require("fs")

router.get("/:file", (req, res) => {
    if (fs.existsSync(`./webpages/html/${req.params.file}.html`)) {
        file = path.join(__dirname, `../webpages/html/${req.params.file}.html`)

        res.status(200).sendFile(file)
    }
    // else {
    //     res.status(404).send("404 not found!")
    // }
})

module.exports = router