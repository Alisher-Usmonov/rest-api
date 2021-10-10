const { OrdersGET, OrderGET, OrderPOST, OrderDELETE } = require("../Controllers/OrderControl");
const router = require("express").Router();

router.get("/", OrdersGET);
router.get("/:slug", OrderGET);
router.post("/:slug", OrderPOST);
router.delete("/:slug", OrderDELETE);

module.exports = {
    path: "/buy",
    router
}