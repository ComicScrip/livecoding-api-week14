const db = require('../db.js');

class Task {
  constructor (task) {
    this.id = task.id;
    this.name = task.name;
    this.done = task.done;
  }

  static async create (newtask) {
    
  }

  static async findById (id) {
    
  }

  static async nameAlreadyExists (name) {
    
  }

  static async getAll (result) {

  }

  static async updateById (id, task) {

  }
}

module.exports = Task;
