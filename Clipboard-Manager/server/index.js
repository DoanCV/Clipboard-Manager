const express = require("express");
const mongoose = require("mongoose");

// set up an express server

const app = express();

app.listen(5000, () => console.log("Server started on port 5000"));

app.get("/test", (req, res) => {
    res.send("Now it should not load infinitely");
    console.log("Test");
});