const router = require("express").Router();
const Snippet = require("../models/snippetModel");


// Read clip endpoint
router.get("/", async (req, res) => {

    try {

        const snippets = await Snippet.find();
        res.json(snippets);

    }
    catch(err) {

        // in case of mongoose error
            // empty send for security
        res.status(500).send();

    }

});


// Create clip endpoint
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
            // empty send for security
        res.status(500).send();

    }

});


// Delete clip endpoint
router.delete("/:id", async (req, res) => {

    try {

        const snippetID = req.params.id;
        // console.log(snippetID);

        // validation for missing ID
        if (!snippetID){
            return res.status(400).json( {errorMessage: "Contact developer with this query: Missing snippetID."} );
        }

        const existingSnippet = await Snippet.findById(snippetID);
        if (!existingSnippet){
            return res.status(400).json( {errorMessage: "Contact developer with this query: Missing clip with given snippetID"} );
        }

        // await Snippet.findByIdAndDelete();
            // redundant so the line below is faster
        await existingSnippet.delete();

        res.json(existingSnippet);

    }
    catch(err){

        // in case of mongoose error
            // empty send for security
        res.status(500).send();

    }
    
});

/*
// Test endpoint
router.get("/test", (req, res) => {
    res.send("Router test");
});
*/

module.exports = router;