const { Router } = require('express');

const ResidentController = require('./app/controllers/ResidentController');
const TypeController = require('./app/controllers/TypeController');
const VehicleController = require('./app/controllers/VehicleController');

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

router.get('/vehicles', VehicleController.index);
router.get('/vehicles/:plate', VehicleController.show);
router.post('/vehicles', VehicleController.store);
router.delete('/vehicles/:id', VehicleController.delete);

module.exports = router;
