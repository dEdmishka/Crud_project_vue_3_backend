const Router = require('express');
const router = new Router();
const faq = require('../controller/faq.controller.js');

router.post('/faq', faq.createFaq);

router.get('/faq/:id', faq.readFaq);

router.get('/faq', faq.getFaqs);

router.put('/faq/:id', faq.updateFaq);

router.delete('/faq/:id', faq.deleteFaq);

module.exports = router;