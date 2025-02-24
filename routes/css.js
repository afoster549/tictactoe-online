const express = require("express")
const router = express.Router()

const path = require("path")
const fs = require("fs")

router.get("/:file", (req, res) => {
    if (fs.existsSync(`./webpages/css/${req.params.file}.css`)) {
        file = path.join(__dirname, `../webpages/css/${req.params.file}.css`)
        
        res.status(200).sendFile(file)
    }
    // else {
    //     res.status(404).send("404 not found!")
    // }
})

module.exports = router
