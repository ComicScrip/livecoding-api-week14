const tasksController = require('../controllers/task.controller.js');
const router = require('express').Router();

router.post('/', tasksController.create);
router.get('/', tasksController.findAll);
router.get('/:id', tasksController.findOne);
router.put('/:id', tasksController.update);
router.delete('/:id', tasksController.delete);

module.exports = router;
