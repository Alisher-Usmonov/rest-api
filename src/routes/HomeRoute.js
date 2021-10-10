const { HomeGET } = require("../Controllers/HomeControl");
const router = require("express").Router();

router.get("/", HomeGET);

module.exports = {
    path: "/",
    router
}