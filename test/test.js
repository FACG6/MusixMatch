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

test('test search girls like you', (t) => {
  supertest(router)
      .post("/search")
      .send('5523739')
      .expect(200)
      .expect('Content-Type',/json/)
      .end((err, res) => {
          t.error(err);
          t.equal(res.body,'Spent 24 hours I need more hours with you You spent the weekend Getting even, ooh ooh We spent the late nights Making things right, between us But now it\'s all good baby Roll that Backwood baby And play me close  \'Cause girls like you Run around with guys like me \'Til sundown, when I come through I need a girl like you, yeah yeah  Girls like you Love fun, yeah me too What I want when I come through I need a girl like you, yeah yeah  Yeah yeah yeah Yeah yeah yeah I need a girl like you, yeah yeah  Yeah yeah yeah Yeah yeah yeah I need a girl like you, yeah yeah  I spent last night On the last flight to you ...  ******* This Lyrics is NOT for Commercial use ******* (1409618207658)' ,'test is done girls like you');
          t.end();
      });
});


test('test search fight fire song', (t) => {
    supertest(router)
        .post("/search")
        .send('fight fire')
        .expect(200)
        .expect('Content-Type',/json/)
        .end((err, res) => {
            t.error(err);
            t.equal(res.body,'Spent 24 hours I need more hours with you You spent the weekend Getting even, ooh ooh We spent the late nights Making things right, between us But now it\'s all good baby Roll that Backwood baby And play me close  \'Cause girls like you Run around with guys like me \'Til sundown, when I come through I need a girl like you, yeah yeah  Girls like you Love fun, yeah me too What I want when I come through I need a girl like you, yeah yeah  Yeah yeah yeah Yeah yeah yeah I need a girl like you, yeah yeah  Yeah yeah yeah Yeah yeah yeah I need a girl like you, yeah yeah  I spent last night On the last flight to you ...  ******* This Lyrics is NOT for Commercial use' ,'test is done girls like you');
            t.end();
        });
  });
  

