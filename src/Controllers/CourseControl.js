const slugify = require("slugify");
const getDB = require("../modules/getDB");
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    async CoursesGET(req, res) {
        let db = await getDB();

        res.status(200).json({
            ok: true,
            ...db
        })
    },
    async CourseGET(req, res) {
        let slug = slugify(req.params.slug, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        })
        db = await getDB();

        let course = db.courses.find(course => course.slug === slug);

        if (!course) {
            res.status(400).json({
                ok: false,
                message: "Course is not defined"
            })
            return;
        }
        res.status(200).json({
            ok: true,
            course
        })
    },
    async CoursePOST(req, res) {
        let { name, author, price } = req.body;
        let slug = slugify(name, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        })

        let db = await getDB();
        let find = db.courses.find(crs => crs.slug === slug);

        if(find) {
            res.status(400).json({
                ok: false,
                message: "This book is already exist!"
            })
            return;
        }

        db.courses.push({
            id: db.courses.length+1,
            name,
            author,
            price,
            slug
        });

        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json({
            ok: true,
            message: "New course successfully added to database !"
        })

    },
    async CoursePATCH(req, res) {
        let db = await getDB();

        let slug = slugify(req.params.slug, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        });

        let course = db.courses.find(crs => crs.slug === slug);
        let crsIdx = db.courses.findIndex(crs => crs.slug === slug);

        if(!course) {
            res.status(400).json({
                ok: false,
                message: "Course is not defined"
            })
            return;
        }
        course = {
            ...course,
            ...req.body
        }
        if(req.body.name) {
            course.slug = slugify(req.body.name, {
                remove: /[*+~.()'"!:@]/g,
                lower: true
            });
        }
        db.courses[crsIdx] = course;

        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));
        res.status(200).json({
            ok: true,
            message: "Course is UPDATED!"
        });

    },
    async CourseDELETE(req, res) {
        let db = await getDB();

        let slug = slugify(req.params.slug, {
            remove: /[*+~.()'"!:@]/g,
            lower: true
        });

        let course = db.courses.find(crs => crs.slug === slug);
        let crsIdx = db.courses.findIndex(crs => crs.slug === slug);

        if(!course) {
            res.status(400).json({
                ok: false,
                message: "Course is not defined"
            })
            return;
        }
        db.courses.splice(crsIdx, 1);

        await fs.writeFile(path.join(__dirname, "..", "db", "db.json"), JSON.stringify(db));

        res.status(200).json({
            ok: true,
            message: "Course is DELETED!"
        });
        
    }
}