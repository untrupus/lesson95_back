const User = require("../models/User");

const auth = async (req, res, next) => {
    const token = req.get("Authorization");
    if(!token) {
        return res.status(401).send({error: "no token"});
    }
    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: "Unauthorized"})
    }
    req.user = user;
    next();
};

module.exports = auth;