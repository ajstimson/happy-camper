const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
    {
        status: String,
        email: {
            type: String,
            required: [true, "Email is required"],
            minlength: [5, "Email must be at least 5 characters long"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters long"],
        },
        opinions: [],
        userToken: String,
    },
    { timestamps: true }
)

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value))

UserSchema.pre("validate", function (next) {
    //skip validation if status is temp
    if (this.status !== "temp" && this.password !== this.confirmPassword) {
        this.invalidate("Password does not match confirm password")
    }
    next()
})

UserSchema.pre("save", function (next) {
    try {
        const hash = bcrypt.hashSync(this.password, 10)
        this.password = hash
        next()
    } catch (err) {
        console.log("Error in save", err)
        next(err)
    }
})

module.exports = mongoose.model("User", UserSchema)
