const Task = require('../models/task.model.js');
const Joi = require('@hapi/joi');

class taskController {
  static async create (req, res) {
    const clientPayload = req.body;

    const {error} = Task.validate(clientPayload);
    if (error) {
      return res.status(422).send({errorMessage: error.message, errorDetails: error.details})
    }

    const nameExists = await Task.nameAlreadyExists(clientPayload.name)
    if (nameExists) {
      return res.status(409).send({errorMessage: 'A task with this name already exists'})
    }

    const createdTask = await Task.create({...clientPayload, done: !!clientPayload.done})
    res.status(201).send(createdTask)
  }

  static async findAll (req, res) {
    const {results: tasks} = await Task.getSome()
    res.send(tasks)
  }

  static async findOne (req, res) {
    
  }

  static async update (req, res) {
    const {id} = req.params
    const clientPayload = req.body;

    const {error} = Task.validate(clientPayload, false);
    if (error) {
      return res.status(422).send({errorMessage: error.message, errorDetails: error.details})
    }

    const nameExists = await Task.nameAlreadyExists(clientPayload.name)
    if (nameExists) {
      return res.status(409).send({errorMessage: 'A task with this name already exists'})
    }

    const updated = await Task.updateById(id, {...clientPayload, done: !!clientPayload.done})
    res.send(updated)
  }

  static async delete (req, res) {
    
  }
}

module.exports = taskController;
