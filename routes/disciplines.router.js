const Router = require('express');
const router = new Router();
const discipline = require('../controller/disciplines.controller.js');

router.post('/discipline', discipline.createDiscipline);

router.get('/discipline/:id', discipline.readDiscipline);

router.get('/discipline', discipline.getDisciplines);

router.put('/discipline/:id', discipline.updateDiscipline);

router.delete('/discipline/:id', discipline.deleteDiscipline);

module.exports = router;