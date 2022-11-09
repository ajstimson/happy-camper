const UserControllers = require("../controllers/user.controller")
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    app.post("/api/users/register", UserControllers.registerUser)
    app.post("/api/users/login", UserControllers.loginUser)
    app.post("/api/users/logout", UserControllers.logoutUser)
    app.get("/api/users/loggedin", authenticate, UserControllers.checkUser)
    app.put("/api/users/setOpinion", UserControllers.setUserOpinion)
    app.post("/api/users/checkUser", UserControllers.checkUser)
    app.post("/api/users/comments", UserControllers.addComment)
}
