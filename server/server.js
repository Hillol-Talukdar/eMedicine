const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const filesystem = require("fs");
require("dotenv").config();

//importing routes
// const authRoutes = require("./routes/auth");

const app = express();

//database
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED!"))
    .catch((err) => console.log(`DB CONNECTION ERROR ${err}`));

//middlewares
app.use(morgan("dev")); //for tracking the requests on command prompt
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes middleware
// app.use("/api", authRoutes);
filesystem
    .readdirSync("./routes")
    .map((rt) => app.use("/api", require("./routes/" + rt)));

//route

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running port: ${port}`));
