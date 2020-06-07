const request = require('supertest');
const app = require('../server.js');
const task = require('../models/task.model.js');

describe('tasks endpoints', () => {
  describe('GET /tasks', () => {
    describe('when there are two tasks in DB', () => {
      let res;
      beforeEach(async () => {
        await Promise.all([
          task.create({ first_name: 'John', last_name: 'Doe', email: 'john.doe@gmail.com' }),
          task.create({ first_name: 'Jane', last_name: 'Doe', email: 'jane.doe@gmail.com' })
        ]);
        res = await request(app).get('/tasks');
      });

      it('status is 200', async () => {
        expect(res.status).toBe(200);
      });

      it('the returned data is an array containing two elements', async () => {
        expect(Array.isArray(res.body.data));
        expect(res.body.data.length).toBe(2);
      });
    });
  });

  describe('POST /tasks', () => {
    describe('when a valid payload is sent', () => {
      let res;
      beforeAll(async () => {
        res = await request(app).post('/tasks').send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@gmail.com'
        });
      });

      it('returns 201 status', async () => {
        expect(res.statusCode).toEqual(201);
      });

      it('returns the id of the created task', async () => {
        expect(res.body.data).toHaveProperty('id');
      });
    });

    describe('when a task with the same email already exists in DB', () => {
      let res;
      beforeAll(async () => {
        task.create({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@gmail.com'
        });
        res = await request(app).post('/tasks').send({
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'john.doe@gmail.com'
        });
      });

      it('returns a 400 status', async () => {
        expect(res.status).toBe(400);
      });

      it('retuns an error message', async () => {
        expect(res.body).toHaveProperty('errorMessage');
      });
    });
  });
});
