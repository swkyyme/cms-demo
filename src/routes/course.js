const express = require('express');
const {
    getCourse,
    getAllCourses,
    addCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/course');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourse); 
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;