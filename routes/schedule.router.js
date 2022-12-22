const Router = require('express');
const router = new Router();
const schedule = require('../controller/schedule.controller.js');

router.post('/schedule', schedule.createSchedule);

router.get('/schedule/:id', schedule.readSchedule);

router.get('/schedule', schedule.getSchedules);

router.put('/schedule/:id', schedule.updateSchedule);

router.delete('/schedule/:id', schedule.deleteSchedule);

module.exports = router;