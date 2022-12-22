const Router = require('express');
const router = new Router();
const student = require('../controller/student.controller.js');

router.post('/student', student.createStudent);

router.get('/student/:id', student.readStudent);

router.get('/student', student.getStudents);

router.put('/student/:id', student.updateStudent);

router.delete('/student/:id', student.deleteStudent);

module.exports = router;