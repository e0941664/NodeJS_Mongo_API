let mongoose = require('mongoose');
let userdetails = require('../models/Userdetails');

let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaihttp);

describe('Userdetails', () => {
  before((done) => {
    userdetails.remove({}, (err) => {
      done();
    });
  });

  after((done) => {
    userdetails.remove({}, (err) => {
      done();
    });
  });

  //Test GET -> Fetch all users from DB
  describe('GET /users', () => {
    it('GET -> should return all users', (done) => {
      chai
        .request(server)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          done();
        });
    });
  });

  //Test POST -> Insert new user into database (success)
  describe('POST /users', () => {
    it('POST -> should create new user -- success response', (done) => {
      let userdetail = {
        _id: '1',
        name: 'anand',
        dob: '12-07-2022',
        address: 'address',
        description: 'Description',
        createdAt: new Date(),
      };
      chai
        .request(server)
        .post('/api/v1/users')
        .send(userdetail)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data').eql(userdetail);
          done();
        });
    });
  });

  //Test POST -> Insert existing primary key user into database (Error)
  describe('POST /Userdetails', () => {
    it('POST -> should create new user -- error response', (done) => {
      let userdetail = {
        _id: '1',
        name: 'anand',
        dob: '12-07-2022',
        address: 'address',
        description: 'Description',
        createdAt: new Date(),
      };
      chai
        .request(server)
        .post('/api/v1/users')
        .send(userdetail)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
