const router = require("express").Router();

router.post("/", async (req, res) => {
    try {
        const { email, password, passwordConfirm } = req.body;

        // validate body
        
        if (!email || !password || !passwordConfirm) {
            return res.status(400).json({
                errorMessage: "You are missing required fields. Fill them in."
            });
        }

        // all special characters permitted but length must be at least 6 characters
        if (password.length < 6) {
            return res.status(400).json({
                errorMessage: "Your password is too short (must be at least 6 characters)."
            });
        }

        if (passwordConfirm !== password) {
            return res.status(400).json({
                errorMessage: "Your passwords do not match."
            });
        }

    }
    catch (err) {
        res.status(500).send();
    }
});

module.exports = router;