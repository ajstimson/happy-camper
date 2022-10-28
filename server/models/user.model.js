const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
var isValidZip = require("is-valid-zip")

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			minlength: [2, "First name must be at least 2 characters long"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			minlength: [2, "Last name must be at least 2 characters long"],
		},
		zip: {
			type: Number,
			required: [true, "Zip code is required"],
			minlength: [5, "Zip code must be at least 5 characters long"],
			maxlength: [5, "Zip code must be at most 5 characters long"],
			validate: {
				validator: function (v) {
					return isValidZip(v)
				},
				message: "Please use a valid zip code",
			},
		},
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
	},
	{ timestamps: true }
)

UserSchema.virtual("confirmPassword")
	.get(() => this._confirmPassword)
	.set((value) => (this._confirmPassword = value))

UserSchema.pre("validate", function (next) {
	console.log("this.password", this.password)
	console.log("this.confirmPassword", this.confirmPassword)
	if (this.password !== this.confirmPassword) {
		this.invalidate("Password does not match confirm password")
	}
	next()
})

UserSchema.pre("save", function (next) {
	// this is a mongoose hook
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
