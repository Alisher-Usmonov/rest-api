const { CoursesGET, CourseGET, CoursePOST, CoursePATCH, CourseDELETE, OrderCourse, OrderDELETE, OrdersGET, OrderGET } = require("../Controllers/CourseControl");
const router = require("express").Router();

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