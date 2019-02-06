const test = require('tape');
const supertest = require('supertest');
const router = require('../src/router');

test('Home route returns a status code of 200', (t) => {
  supertest(router)
      .get("/")
      .expect(200)
      .expect('Content-Type', /html/)
      .end((err, res) => {
          t.error(err);
          t.equal(res.statusCode,200,'test is done '); 
          t.end();
      });
});

test('test search', (t) => {
  supertest(router)
      .post("/search")
      .expect(200)
      .expect('Content-Type',/html/)
      .end((err, res) => {
          t.error(err);
          t.equal(res.statusCode,200,'test is done');
          t.end();
      });
});