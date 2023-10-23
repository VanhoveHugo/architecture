const express = require("express");
let router = express.Router();

router.get("/task",(req,res) => {
    res.json("task")
})

module.exports = router;