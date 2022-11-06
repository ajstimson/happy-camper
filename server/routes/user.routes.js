const UserControllers = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/users/register", UserControllers.registerUser);
  app.post("/api/users/createTempUser", UserControllers.createTempUser);
  app.post("/api/users/login", UserControllers.loginUser);
  app.post("/api/users/logout", UserControllers.logoutUser);
  app.get("/api/users/checkUser", authenticate, UserControllers.checkUser);
};
