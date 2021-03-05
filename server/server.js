const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log(`DB CONNECTION ERROR ${err}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//route
app.get("/api", (req, res) => {
    res.json({
        data: "Node API Working!",
    });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running port: ${port}`));
