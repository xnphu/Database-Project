const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const config = require("./config-local.json");

const app = express();

// const authRouter = require("./routers/authRouter");
const guestRouter = require("./routers/guestRouter");
const hostRouter = require("./routers/hostRouter");
const roomRouter = require("./routers/roomRouter");

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, DELETE, OPTIONS"
    );

    if (req.headers.origin) {
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }

    res.setHeader("Access-Control-Allow-Credentials", true);

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(
    session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/api/auth", authRouter);
app.use("/api/guests", guestRouter);
app.use("/api/hosts", hostRouter);
app.use("/api/rooms", roomRouter);

// app.use(express.static('./public'));

// app.get('/', (req, res) => {
//     res.sendFile('./public/index.html');
// });

mongoose.connect(config.mongoPath, err => {
    if (err) console.error(err);
    else console.log("Database connect successful");
});

const port = 1808;
app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log("Listen at port " + port)
});