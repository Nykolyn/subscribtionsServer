const router = require('express').Router();
const { SubscriberController } = require('../controllers');

router.get('/:id', SubscriberController.getSubs);
router.post('/', SubscriberController.addSub);
router.patch('/updateSub/:id', SubscriberController.updateSub);
router.delete('/:id', SubscriberController.deleteSub);

module.exports = router;
