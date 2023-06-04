const { Router } = require('express');

const ResidentController = require('./app/controllers/ResidentController');

const router = Router();

router.get('/residents', ResidentController.index);
router.get('/residents/:id', ResidentController.show);
router.post('/residents', ResidentController.store);
router.put('/residents/:id', ResidentController.update);
router.delete('/residents/:id', ResidentController.delete);

module.exports = router;
