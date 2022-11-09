const express = require("express")
const app = express()
const PORT = 8000
const cors = require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")
require("./config/mongoose.config")
require("./config/jwt.config")
//middleware
app.use(express.json(), express.urlencoded({ extended: true }))
app.use(cookieParser())

// app.use(
// 	cors({
// 		credentials: true,
// 		origin: true,
// 	})
// )

const corsConfig = {
    origin: true,
    credentials: true,
}

app.use(cors(corsConfig))
app.options("http://localhost:3000", cors(corsConfig))

require("./routes/facilities.routes")(app)
require("./routes/user.routes")(app)

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
