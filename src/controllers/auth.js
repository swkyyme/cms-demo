const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function loginUser(req, res) {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username }).exec();
    if (!existingUser) {
        return res.status(400).json('Invalid username or password'); ////need to add status code otherwise will return 200
    }

    const validPassword = await existingUser.validatePassword(password);
    if (!validPassword) {
        return res.status(400).json('Invalid username or password'); //need to add status code otherwise will return 200
    }
    // if (existingUser.password !== password) {
    //     return res.json('Invalid username or password');
    // }
    const token = generateToken(existingUser._id);
    return res.json({ username, token });
}

module.exports = {
    loginUser
};