const Router = require('express');
const router = new Router();
const faculty = require('../controller/faculty.controller.js');

router.post('/faculty', faculty.createFaculty);

router.get('/faculty/:id', faculty.readFaculty);

router.get('/faculty', faculty.getFaculties);

router.put('/faculty/:id', faculty.updateFaculty);

router.delete('/faculty/:id', faculty.deleteFaculty);

module.exports = router;