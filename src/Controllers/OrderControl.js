const getDB = require("../modules/getDB");
const slugify = require("slugify")
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    async OrderGET(req, res) {
        let slug = slugify(req.params.slug, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        });
        let db = await getDB();
        let order = db.orders.find(ord => ord.slug === slug);

        if (!order) {
            res.status(400).json({
                ok: false,
                message: "Order is not defined!"
            })
            return;
        }
        res.status(200).json({
            ok: true,
            order
        });
    },
    async OrdersGET(req, res) {
        let db = await getDB();

        res.status(200).json({
            ok: true,
            orders: [
                ...db.orders
            ]
        })
    },
    async OrderPOST(req, res) {
        let slug = slugify(req.params.slug, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        });
        let db = await getDB();
        let course = db.courses.find(crs => crs.slug === slug);
        if (!course) {
            res.status(400).json({
                ok: false,
                message: "Course is not defined!"
            })
            return;
        }
        let find = db.orders.find(order => order.slug === slug);
        if (find) {
            res.status(400).json({
                ok: false,
                message: "This course is already ordered!"
            })
            return;
        }
        order = {
            id: db.orders.length + 1,
            course_id: course.id,
            time: new Date(Date.now()).toLocaleString(),
            slug
        }

        db.orders.push(order);

        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json({
            ok: true,
            message: "Course is successfully ordered"
        })
    },
    async OrderDELETE(req, res) {
        let { slug } = req.params;
        let db = await getDB();
        let find = db.orders.find(order => order.slug === slug);
        if (!find) {
            res.status(400).json({
                ok: false,
                message: "This order is not defined!"
            })
            return;
        }
        let idx = db.orders.findIndex(order => order.slug === slug);
        db.orders.splice(idx, 1);

        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json({
            ok: true,
            message: "Order is successfully deleted !"
        })
    }
}