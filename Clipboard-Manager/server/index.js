const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load in MongoDB database password
dotenv.config();

// set up an express server
const app = express();

app.use(express.json());

app.listen(5000, () => console.log("Server started on port 5000"));

// set up router
app.use("/snippet", require("./routers/snippetRouter"));

// connect to MongoDB
    // mongodb+srv://devistry:<password>@clipboardmanager.oxqfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    // database name: snippet
    // replace password with your own
mongoose.connect(process.env.MDB_CONNECT_STRING, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Connected to MongoDB");
});



/*
app.get("/test", (req, res) => {
    res.send("Now it should not load infinitely");
    console.log("Test");
});
*/