const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const randomString = require("randomstring")
const SECRET = process.env.SECRET_KEY

module.exports = {
    registerUser: async (req, res) => {
        try {
            const user = await User.create(req.body)
            const userToken = jwt.sign(
                { _id: user._id, email: user.email },
                SECRET
            )

            res.status(201)
                .cookie("userToken", userToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 90000),
                })
                .json({ successMessage: "User is registered", user: user })
        } catch (err) {
            res.status(400).json(err)
        }
    },
    checkUser: async (req, res) => {
        try {
            const cookie = jwt.decode(req.cookies.userToken, {
                complete: true,
            })

            //If cookie exists, return user
            if (cookie) {
                const user = await User.findOne({ email: cookie.payload.email })
                console.log("user", user)
                res.status(200).json({
                    status: user.status,
                    user_id: user.id,
                    opinions: user.opinions,
                })
            } else {
                const user = await User.create({
                    email: "tempemail",
                    password: "tempPassword",
                    confirmPassword: "tempPassword",
                    status: "temp",
                    opinions: [],
                })

                //create temp user and set cookie
                let userToken = jwt.sign(
                    {
                        _id: user._id,
                        email: user.email,
                    },
                    SECRET
                )

                res.status(201)
                    .cookie("userToken", userToken, {
                        httpOnly: true,
                        expires: new Date(Date.now() + 90000),
                    })
                    .json({
                        status: user.status,
                        user_id: user.id,
                        opinions: user.opinions,
                    })
            }
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    loginUser: async (req, res) => {
        if (!req.body.email) {
            res.status(400).json({ errorMessage: "Invalid login attempt" })
        }
        try {
            const user = await User.findOne({ email: req.body.email })
            const correctPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!correctPassword) {
                res.status(400).json({
                    errorMessage: "Email and password do not match",
                })
            } else {
                const userToken = jwt.sign(
                    { _id: user._id, email: user.email },
                    SECRET
                )
                res.cookie("userToken", userToken, SECRET, {
                    httpOnly: true,
                }).json({ successMessage: "User is logged in", user: user })
            }
        } catch (err) {
            res.status(400).json(err)
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie("userToken")
        res.json({ successMessage: "User is logged out" })
    },
    setUserOpinion: async (req, res) => {
        try {
            const user = await User.findById(req.body.user_id)

            //set new opinion array
            const Opinions = user.opinions

            Opinions.length > 0
                ? Opinions.forEach((opinion) => {
                      if (opinion.facilityID == req.body.facilityID) {
                          //if opinion status is the same as req.body.status, remove opinion
                          if (opinion.status == req.body.status) {
                              opinion.status = null
                          } else {
                              opinion.status = req.body.status
                          }
                      } else {
                          Opinions.push({
                              facilityID: req.body.facilityID,
                              status: req.body.status,
                          })
                      }
                  })
                : Opinions.push({
                      facilityID: req.body.facilityID,
                      status: req.body.status,
                  })

            //update user
            user.opinions = Opinions
            // save user document
            await user.save()
            res.json(user.opinions)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
    addComment: async (req, res) => {
        try {
            const user = await User.findById(req.body.user_id)
            const Opinions = user.opinions
            // Opinions.forEach((opinion) => {
            //     if (opinion.facilityID == req.body.facilityID) {
            //         opinion.comment = req.body.comment
            //     }
            // })
            // user.opinions = Opinions
            // await user.save()
            // res.json(user.opinions)
            res.json(req.body)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    },
}
