const tasksController = require('../controllers/task.controller.js');
const router = require('express').Router();

router.get('/', tasksController.findAll);
router.post('/', tasksController.create);
router.patch('/:id', tasksController.update);

module.exports = router;
