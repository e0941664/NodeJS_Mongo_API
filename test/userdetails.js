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
    it('1. GET -> should return all users', (done) => {
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

  //Test GET -> Fetch User by /:id (Id present in the DB)
  describe('GET /users/:id', () => {
    it('2. GET -> should return users based on the entered :id', (done) => {
      let userdetail = new userdetails({
        _id: '1',
        name: 'anand',
        dob: '13-07-2022',
        address: 'address',
        description: 'Description',
        createdAt: new Date(),
      });

      userdetail.save((err, userdetail) => {
        chai
          .request(server)
          .get('/api/v1/users/' + userdetail._id)
          .send(userdetail)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql(true);
            res.body.should.have.property('data');
            done();
          });
      });
    });
  });

  //Test GET -> Fetch User by /:id (Id Not present in the DB)
  describe('GET /users/:id', () => {
    it('3. GET -> should not return users based on the entered :id', (done) => {
      let userdetail = new userdetails({
        _id: '5',
        name: 'anand',
        dob: '13-07-2022',
        address: 'address',
        description: 'Description',
        createdAt: new Date(),
      });

      // userdetail.save((err, userdetail) => {
      chai
        .request(server)
        .get('/api/v1/users/' + userdetail._id)
        .send(userdetail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have
            .property('error')
            .eql('No user found for the entered id: ' + userdetail._id);
          done();
        });
    });
    //});
  });

  //Test POST -> Insert new user into database (success)
  describe('POST /users', () => {
    it('4. POST -> should create new user -- success response', (done) => {
      let userdetail = {
        _id: '2',
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
          res.body.should.have.property('data');
          done();
        });
    });
  });

  //Test POST -> Insert existing primary key user into database (Error)
  describe('POST /Userdetails', () => {
    it('5. POST -> should create new user -- error response', (done) => {
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
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  //Test PUT -> Update data of user present in the data base by :id (success response)
  describe('PUT /users', () => {
    it('6. PUT -> should update existing user in the database by :id -- success response', (done) => {
      let updateduserdetail = new userdetails({
        _id: '2',
        name: 'sathosh',
        dob: '13-07-2022',
        address: 'address3',
        description: 'Description3',
        createdAt: new Date(),
      });

      chai
        .request(server)
        .put('/api/v1/users/' + updateduserdetail._id)
        .send(updateduserdetail)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  //Test PUT -> Do not update data of user not present in the data base by :id (error response)
  describe('PUT /users', () => {
    it('7. PUT -> should not update non-existing user in the database by :id -- error response', (done) => {
      let updateduserdetail = new userdetails({
        _id: '5',
        name: 'sathosh',
        dob: '13-07-2022',
        address: 'address3',
        description: 'Description3',
        createdAt: new Date(),
      });

      chai
        .request(server)
        .put('/api/v1/users/' + updateduserdetail._id)
        .send(updateduserdetail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('error');
          done();
        });
    });
  });

  //Test DELETE -> Delete data of user present in the data base by :id (success response)
  describe('DELETE /users', () => {
    it('8. DELETE -> should delete existing user in the database by :id -- success response', (done) => {
      let userId = 2;

      chai
        .request(server)
        .delete('/api/v1/users/' + userId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          res.body.should.have.property('data');
          done();
        });
    });
  });

  //Test DELETE -> Do not delete data of user not present in the data base by :id (error response)
  describe('DELETE /users', () => {
    it('9. DELETE -> should not delete non-existing user in the database by :id -- error response', (done) => {
      let userId = 2;

      chai
        .request(server)
        .delete('/api/v1/users/' + userId)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(false);
          res.body.should.have.property('error');
          done();
        });
    });
  });
});
