const jwt = require('jsonwebtoken');
const sec = "pokemon";

const authentication = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).send('invalid token');
    }

    try {
        const data = jwt.verify(token, sec);
        req.id = data.id;
        next();
    }
    catch (error) {
        return res.status(400).send('invalid token');
    }
}

module.exports = authentication;