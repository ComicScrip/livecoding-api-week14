const Task = require('../models/task.model.js');
const {tryParseInt}  = require('../helpers/number')

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
    setTimeout(async () => {
      const page = tryParseInt(req.query.page, 1);
      const per_page = tryParseInt(req.query.per_page, 30);
      const {results, total} = await Task.getSome(per_page, (page - 1) * per_page)
      const rangeEnd = page * per_page;
      const rangeBegin = rangeEnd - per_page + 1;
      res.header('content-range', `${rangeBegin}-${rangeEnd}/${total}`)
      res.send(results)
    }, 0)
  }

  static async update (req, res) {
    setTimeout(async () => {
      // return res.sendStatus(500)
      const {id} = req.params
      const clientPayload = req.body;
  
      const existingTask = await Task.findById(id)
      if (!existingTask) {
        return res.sendStatus(404)
      }
  
      const {error} = Task.validate(clientPayload, false);
      if (error) {
        return res.status(422).send({errorMessage: error.message, errorDetails: error.details})
      }
  
      if (clientPayload.name !== existingTask.name) {
        const nameExists = await Task.nameAlreadyExists(clientPayload.name)
        if (nameExists) {
          return res.status(409).send({errorMessage: 'A task with this name already exists'})
        }
      }
  
      const updated = await Task.updateById(id, {...clientPayload, done: !!clientPayload.done})
      res.send(updated)
    }, 0)
  }
}

module.exports = taskController;
