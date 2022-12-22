const Router = require('express');
const router = new Router();
const department = require('../controller/departments.controller.js');

router.post('/department', department.createDepartment);

router.get('/department/:id', department.readDepartment);

router.get('/department', department.getDepartments);

// router.get('/department', department.getFaculties);

router.put('/department/:id', department.updateDepartment);

router.delete('/department/:id', department.deleteDepartment);

module.exports = router;