const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.post("/", (req, res) => {
    // const body = req.body;
    // console.log(body);

    // parse body
    const {title, description, code} = req.body; 
    
    const newSnippet = new Snippet({
        title, description, code
    });
    
    newSnippet.save();
});

/*
router.get("/test", (req, res) => {
    res.send("Router test");
});
*/

module.exports = router;