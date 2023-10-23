const express = require("express");
let router = express.Router();

router.get("/user",(req,res) => {
    res.json("user")
})

module.exports = router;