const Router = require('express');
const router = new Router();
const teacher = require('../controller/teacher.controller.js');

router.post('/teacher', teacher.createTeacher);

router.get('/teacher/:id', teacher.readTeacher);

router.get('/teacher', teacher.getTeachers);

router.put('/teacher/:id', teacher.updateTeacher);

router.delete('/teacher/:id', teacher.deleteTeacher);

module.exports = router;