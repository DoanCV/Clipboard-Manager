const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

        // check that no other account uses the provided email
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res.status(400).json({
                errorMessage: "An account with this email already exists."
            });
        }

        // hash the password so users cannot read database password
            // bcrypt algorithm
                // apply random string to password then hashes that
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // add valid user to database

        const newUser = new User({
            email,
            passwordHash
        });

        const savedUser = await newUser.save();

    }
    catch (err) {
        res.status(500).send();
    }
});

module.exports = router;