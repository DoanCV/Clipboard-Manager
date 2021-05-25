const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

        // create login token with JWT token encoding
            // i want to know who is logged in
                // note: only my server can modify secret field, so only this sever can validate cookies
        
        // structure: header.payload.verify_signature 
            // payload is just valid user since i only want to show their clipboards        
        const token = jwt.sign({
            id: savedUser._id
        }, process.env.JWT_SECRET);

        // to avoid javascript injection, cookies will not be available in javascript/browser
        res.cookie("token", token, { httpOnly: true }).send();

    }
    catch (err) {
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                errorMessage: "You are missing required fields. Fill them in."
            });
        }

        // get user account
        const existingUser = await User.findOne({email: email});
        if (!existingUser) {
            return res.status(401).json({
                errorMessage: "Incorrect email or password. Which one? You tell me."
            });
        }

        // before creating the token, check if the password is correct
        const correctPassword = await bcrypt.compare(password, existingUser.passwordHash);

        if (!correctPassword) {
            return res.status(401).json({
                errorMessage: "Incorrect email or password. Which one? You tell me."
            });
        }

        // create login JWT token 
        const token = jwt.sign({
            id: savedUser._id
        }, process.env.JWT_SECRET);

        // avoid javascript injection
        res.cookie("token", token, { httpOnly: true }).send();

    }
    catch (err) {
        res.status(500).send();
    }

});

router.get("/loggedIn", (req, res) => {
    try {

        const token = req.cookies.token;
        if (!token) {
            return res.json(null);
        }

        const validateUser = jwt.verify(token, process.env.JWT_SECRET);
        
        res.json(validateUser.id);

    }
    catch (err) {
        return res.json(null);
    }

});

router.get("/logOut", (req, res) => {
    try {

        res.clearCookie("token").send();

    }
    catch (err) {
        return res.json(null);
    }
})

module.exports = router;