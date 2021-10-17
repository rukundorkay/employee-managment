import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app.js';
import {
  UNAUTHORIZED_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  STATUS_CODE_OK,
  NOT_FOUND_STATUS_CODE,
} from '../helpers/statusHandler.js';

dotenv.config();

const employeeTest = () => {
  chai.use(chaiHttp);

  const UserToken = process.env.USER_TOKEN;
  const User1Token = process.env.USER1_TOKEN;
  


  describe('Testing  create new employee', () => {
    it('should return forbidden you must login to proceed', (done) => {
      const newEmployee = {
            FirstName:"muraxa",
            LastName:"claire",
            email:"rukundojanvier250@gmail.com",
            nationalid:"129009090903020",
            phone:"08990280022",
            DOB:"2000-12-31",
            position:"position"

}
      chai.request(app)
        .post('api/employee/')
        .set('Authorization', '')
        .send(newEmployee)
        .end((err, res) => {
          expect(res).to.have.status(UNAUTHORIZED_STATUS_CODE);
        });
      done();
    });
    
    it('should validate the employee ', (done) => {
      const newEmployee = {
        FirstName:"muraxa",
        LastName:"claire",
        email:"rukundojanvier250@gmail.com",
        nationalid:"129009090903020",
        phone:"08990280022",
        DOB:"2000-12-31",
        position:"position"

}
      chai.request(app)
        .post('/api/employee/')
        .set('Authorization', UserToken)
        .send(newEmployee)
        .end((err, res) => {
          expect(res).to.have.status(400);
        });
      done();
    });
   
    
    it('should return created employee successfully', (done) => {
      const newEmployee = {
        title: 'Good day',
        description: 'Good day we had yesterday when I spent',
      };
      chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', UserToken)
        .send(newEmployee)
        .end((err, res) => {
          expect(res).to.have.status(STATUS_CODE_OK);
        });
      done();
    });
    
  });

  

  describe('Testing user delete entry', () => {
    it('should return entry deleted successfully', (done) => {
      chai.request(app)
        .delete('/api/v1/entries/1')
        .set('Authorization', User1Token)
        .end((err, res) => {
          expect(res).to.have.status(STATUS_CODE_OK);
        });
      done();
    });
  });

 


  
};

export default employeeTest;
