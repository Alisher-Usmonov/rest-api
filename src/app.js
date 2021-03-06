const express = require("express"),
    fs = require("fs"),
    path = require("path"),
    auth = require("./middlewares/Auth")
    morgan = require("morgan");
const app = express();

// ENV
const { PORT } = require("../config");

// Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

// Routes
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach(file => {
            let routePath = path.join(__dirname, "routes", file);
            let Router = require(routePath);
            app.use(Router.path, Router.router);
        })
    }
})

app.listen(PORT, _ => console.log(`Server is running on PORT ${PORT}`))