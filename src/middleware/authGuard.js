const { validateToken } = require('../utils/jwt');

module.exports = ( req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json('Access denied 1');
    }
    const contentArr = authHeader.split(' ');
    if (contentArr.length !==2 || contentArr[0] !== 'Bearer') {
        return res.status(401).json('Access denied 2');
    }

    const decoded = validateToken(contentArr[1]);
    if (decoded) {
        req.user = decoded;
        return next();
    }
    return res.status(401).json('Access denied 3');
};