const mongoose = require("mongoose");

// store a hash of the password, we do not want user readable passwords in database
const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        passwordHash: {type: String, required: true}
    },

    {
        timestamps: true
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;