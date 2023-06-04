const { Router } = require('express');

const ResidentController = require('./app/controllers/ResidentController');
const TypeController = require('./app/controllers/TypeController');

const router = Router();

router.get('/residents', ResidentController.index);
router.get('/residents/:id', ResidentController.show);
router.post('/residents', ResidentController.store);
router.put('/residents/:id', ResidentController.update);
router.delete('/residents/:id', ResidentController.delete);

router.get('/types', TypeController.index);
router.get('/types/:id', TypeController.show);
router.post('/types', TypeController.store);
router.delete('/types/:id', TypeController.delete);

module.exports = router;
