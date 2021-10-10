module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token) {
        res.status(400).json({
            ok: false,
            message: "Not authorized!"
        })
        return;
    }
    if(token !== process.env.TOKEN) {
        res.status(400).json({
            ok: false,
            message: "Incorrect Token!"
        })
        return;
    }
    next();
}