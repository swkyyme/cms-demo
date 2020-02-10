const express = require('express');
const studentRoute = require('./routes/student');
const courseRoute = require('./routes/course');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const authGuard = require('./middleware/authGuard');

const router = express.Router();

router.use('/students', studentRoute);
router.use('/courses', authGuard, courseRoute);
router.use('/courses', courseRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);

module.exports = router;