import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import {
  STATUS_CODE_CREATED,
  STATUS_CODE_OK,
  NOT_FOUND_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
} from '../helpers/statusHandler';

const managerTest = () => {
  chai.use(chaiHttp);

  describe('testing sign up', () => {
    it('should validate user first round', (done) => {
      const newmanager = 
        {
          FirstName:"muraxa",
          LastName:"claire",
          email:"rukundojanvier250@gmail.com",
          password:"IMBOZIzanyu123",
          nationalid:"1196880008463191",
          hone:"0780520810",
          DOB:"2019-12-31"
      
      
      };
      chai.request(app)
        .post('/api/auth/signup')
        .send(newmanager)
        .end((err, res) => {
          expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
        });
      done();
    });
    
    
    
    it('should return User created successfully', (done) => {
      const newmanager = {
        FirstName:"muraxa",
        LastName:"claire",
        email:"rukundojanvier250@gmail.com",
        password:"IMBOZIzanyu123",
        nationalid:"1196880008463191",
        hone:"0780520810",
        DOB:"2000-12-31"
    
    
    };
      chai.request(app)
        .post('/api/auth/signup')
        .send(newmanager)
        .end((err, res) => {
          expect(res).to.have.status(STATUS_CODE_CREATED);
          expect(res.body).to.have.property('data');
          done();
        });
    });
    
  });


  describe('Testing sign in', () => {
    it('should return invalid email or password when user entered email with no existing account', (done) => {
      const invalidCredentials = {
        email:"rukundojan0@gmail.com",
        password:"IMBOZIzan3"
};
      chai.request(app)
        .post('/api/auth/signin')
        .send(invalidCredentials)
        .end((err, res) => {
          expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
        });
      done();
    });
   
    it('should return User is successfully logged in', (done) => {
      const user = {
              email:"rukundojanvier250@gmail.com",
              password:"IMBOZIzanyu123"
      };
      chai.request(app)
        .post('/api/auth/signin')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(STATUS_CODE_OK);
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
};

export default managerTest;
