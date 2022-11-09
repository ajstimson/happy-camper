const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET_KEY
// module.exports.secret = secret
module.exports.authenticate = (req, res, next) => {
	jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
		if (err) {
			console.log(err)
			res.status(200).json({ verified: false })
		} else {
			next()
		}
	})
}
