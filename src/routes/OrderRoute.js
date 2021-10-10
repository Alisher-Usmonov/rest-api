const { OrdersGET, OrderGET, OrderPOST, OrderDELETE } = require("../Controllers/OrderControl");
const Auth = require("../middlewares/Auth");
const router = require("express").Router();

router.use(Auth);
router.get("/", OrdersGET);
router.get("/:slug", OrderGET);
router.post("/:slug", OrderPOST);
router.delete("/:slug", OrderDELETE);

module.exports = {
    path: "/buy",
    router
}