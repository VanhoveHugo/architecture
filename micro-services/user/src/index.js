const express = require("express");
const app     = express()
const port    = 3001
const {route} = require("./route.js");

app.use(route);

app.listen(port,() => {
    console.log(`server is running on port: ${port}`);
})