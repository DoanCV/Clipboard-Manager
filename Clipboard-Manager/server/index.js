const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors =  require("cors");
const cookieParser = require("cookie-parser");

// load in MongoDB database password
dotenv.config();

// set up an express server
const app = express();

app.use(express.json());

// middleware for access control origin headers (for frontend)
app.use(
    cors({
        origin: "http://localhost:3000", 
    })
);

// middleware for cookie parsing
app.use(cookieParser());

app.listen(5000, () => console.log("Server started on port 5000"));

// set up clipbaords router
app.use("/snippet", require("./routers/snippetRouter"));

// set up user authentication router
app.use("/auth", require("./routers/userRouter"));

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