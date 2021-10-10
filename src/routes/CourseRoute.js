const { CoursesGET, CourseGET, CoursePOST, CoursePATCH, CourseDELETE, OrderCourse, OrderDELETE, OrdersGET, OrderGET } = require("../Controllers/CourseControl");
const Auth = require("../middlewares/Auth");
const router = require("express").Router();

router.use(Auth)
router.get("/", CoursesGET);
router.get("/:slug", CourseGET);
router.post("/", CoursePOST);
router.patch("/:slug", CoursePATCH);
router.delete("/:slug", CourseDELETE);
// Order

module.exports = {
    path: "/course",
    router
}