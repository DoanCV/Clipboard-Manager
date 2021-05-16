const router = require("express").Router();
const Snippet = require("../models/snippetModel");

router.post("/", async (req, res) => {
    try {
        // const body = req.body;
        // console.log(body);

        // parse body
        const {title, description, code} = req.body; 
        
        // validate body
        if (!description && !code) {
            return res.status(400).json({ errorMessage: "You need to enter a description or provide code snippet (at least one)." });
        }

        const newSnippet = new Snippet({
            title, description, code
        });
        
        // returns a promise
        const savedSnippet = await newSnippet.save();

        res.json(savedSnippet);
    } 
    catch(err) {
        // in case of mongoose error
        res.status(500).send();
    }
});

/*
router.get("/test", (req, res) => {
    res.send("Router test");
});
*/

module.exports = router;