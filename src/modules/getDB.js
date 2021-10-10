const fs = require("fs/promises");
const path = require("path");

const getDB = async () => {
    const dbPath = path.join(__dirname, "..", "db", "db.json");
    let db = await fs.readFile(dbPath, "utf-8");
    db = await JSON.parse(db);

    return db;
};

module.exports = getDB;