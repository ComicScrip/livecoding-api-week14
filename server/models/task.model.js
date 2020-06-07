const db = require('../db.js');

class task {
  constructor (task) {
    this.id = task.id;
    this.name = task.name;
    this.done = task.done;
  }

  static async create (newtask) {
    return db.query('INSERT INTO tasks SET ?', newtask).then(res => { newtask.id = res.insertId; return newtask; });
  }

  static async findById (id) {
    return db.query(`SELECT * FROM tasks WHERE id = ${id}`)
      .then(rows => {
        if (rows.length) {
          return Promise.resolve(rows[0]);
        } else {
          const err = new Error();
          err.kind = 'not_found';
          return Promise.reject(err);
        }
      });
  }

  static async nameAlreadyExists (name) {
    return db.query('SELECT * FROM tasks WHERE name = ?', [name])
      .then(rows => {
        if (rows.length) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
  }

  static async getAll (result) {
    return db.query('SELECT * FROM tasks');
  }

  static async updateById (id, task) {
    return db.query(
      'UPDATE tasks SET email = ?, first_name = ?, last_name = ?, active = ? WHERE id = ?',
      [task.email, task.first_name, task.last_name, task.active, id]
    ).then(() => this.findById(id));
  }

  static async remove (id) {
    return db.query('DELETE FROM tasks WHERE id = ?', id).then(res => {
      if (res.affectedRows !== 0) {
        return Promise.resolve();
      } else {
        const err = new Error();
        err.kind = 'not_found';
        return Promise.reject(err);
      }
    });
  }
}

module.exports = task;
