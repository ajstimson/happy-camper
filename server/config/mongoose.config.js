const mongoose = require("mongoose")

mongoose
    .connect(`mongodb://127.0.0.1/happy_camper_db`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    .then(() => {
        console.log("connected to the happy_camper_db")
    })
    .catch((err) =>
        console.log("Something went wrong when connecting to the database", err)
    )
