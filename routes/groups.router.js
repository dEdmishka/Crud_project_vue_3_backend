const Router = require('express');
const router = new Router();
const group = require('../controller/groups.controller.js');

router.post('/group', group.createGroup);

router.get('/group/:id', group.readGroup);

router.get('/group', group.getGroups);

router.put('/group/:id', group.updateGroup);

router.delete('/group/:id', group.deleteGroup);

module.exports = router;