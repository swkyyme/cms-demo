const Student = require('../models/student');
const Course = require('../models/course');

async function addStudent(req, res) {
    const { firstName, lastName, email } = req.body;
    const student = new Student({
      firstName, 
      lastName, 
      email
    });
    // try {
    //   await student.save(); 
    // } catch (e) {
    //   return res.json(e);
    // }
    await student.save();  //async
    return res.status(201).json(student);
}

async function getStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findOne({ id }).populate(
    'courses',
    'code name'
  ).exec();
  if (!student) {
    return res.status(404).json('student not found');
  }
  return res.json(student);
}

async function getAllStudents(req, res) {
  // const { pageSize, page }
  // let query = Student.find();
  // if(pageSize && page) {
  //   query = query.skip().limit();
  // }
  // const students = await query.exec();
  const students = await Student.find().exec();
  return res.json(students);
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  //joi.validate({}, template) for findbyidandupdate
  const newStudent = await Student.findByIdAndUpdate(
    id, 
    { firstName, lastName, email },
    { new:true }
  ).exec();
  //Student.findById();
  //student.save(); use save() !!!! when you can! not skip validate
  if (!newStudent) {
    return res.status(404).json('student not found');
  }
  return res.json(newStudent);
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  const deletedStudent = await Student.findByIdAndDelete(id).exec();
  if (!deletedStudent) {
    return res.sendStatus(404).json('student not found');
  }
  await Course.updateMany(
    { _id: { $in: student.courses } },
    { $pull: { studens: student._id } }
  ).exec();
  return res.status(200).json(deletedStudent);
}

async function addCourse(req, res) {
  const { id, code } = req.params;
  const student = await Student.findById(id).exec();
  const course = await Course.findById(code).exec();
  if (!student) {
    return res.status(404).json('student not found');
  } else if (!course) {
    return res.status(404).json('course not found');
  }
  const oldCount = student.courses.length;
  student.courses.addToSet(course._id);
  course.students.addToSet(student._id);

  if (student.courses.length === oldCount) {
    return res.json('enrollment already exist');
  }

  await course.save();
  await student.save();
  return res.json(student);
}

async function deleteCourse(req, res) {
  const { id, code } = req.params;
  const student = await Student.findById(id).exec();
  const course = await Course.findById(code).exec();
  if (!student) {
    return res.status(404).json('student not found');
  } else if (!course) {
    return res.status(404).json('course not found');
  } 

  const oldCount = student.courses.length;
  student.courses.remove(course._id);
  if (student.courses.length === oldCount) {
    return res.status(404).json('enrollment does not exist');
  }
  course.students.pull(student._id);
  await course.save();
  await student.save();
  return res.json(student);
}

module.exports = {
  addStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  addCourse,
  deleteCourse
};