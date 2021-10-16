import express from 'express';
import bcrypt from 'bcrypt';
import {tokenEncrypter,tokenDecrypter} from '../helpers/tokenHandler.js';
import Responsender from '../helpers/responseHandler.js';
import { insert, select,update } from '../helpers/sqlQueries.js';
import { STATUS_CODE_CREATED, STATUS_CODE_FORBIDDEN, STATUS_CODE_OK } from '../helpers/statusHandler.js';
import { sendMail } from '../helpers/mailerHandler.js';
import randomstring  from 'randomstring';

const app = express();
app.use(express.json);

export const managerSignUp = async (req, res) => {
  const response = new Responsender();
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const CreatedAccCode=randomstring.generate(7);
  class manager {
    constructor() {
      this.firstName = req.body.FirstName;
      this.lastName = req.body.LastName;
      this.email = req.body.email;
      this.password = hashedPassword;
      this.ID=req.body.nationalid;
      this.phone=req.body.phone;
      this.DOB=req.body.DOB;
      this.position='MANAGER';
      this.token=CreatedAccCode;
      this.status='INACTIVE';
    }
  }

  const newManager= new manager();

  await insert('manager', 'email, firstname, lastname, password,nationalid,phone,DOB,position,token,status', '$1, $2, $3, $4,$5,$6,$7,$8,$9,$10',
    [newManager.email, newManager.firstName,newManager.lastName,newManager.password,newManager.ID,newManager.phone,newManager.DOB,newManager.position,newManager.token,newManager.status]);
  const idDone = await select('managerid, email', 'manager', `email='${req.body.email}'`);
  let output=`<B>dear ${req.body.FirstName}</B><BR> thank your for creating account with us !,
   to start exploring your acccount <a href="localhost/auth/activate/${newManager.token}">active here<a/>`;
  sendMail(req.body.email,output,"Account creation")
  response.successfully(STATUS_CODE_CREATED,  {
    token: tokenEncrypter(idDone[0].managerid),
  },'account created successfully');
  return response.send(res);

};

export const managerActivateAcc=async(req,res)=>{
  const response = new Responsender();
  const isEmailverified = await select('count(email)', 'manager', `token='${req.params.token}'`);
if(isEmailverified[0].count==1){
    update('manager',`status='ACTIVE'`,`token='${req.params.token}'`);
    response.successfully(STATUS_CODE_CREATED,{},'account ACTIVE successfully');
    return response.send(res);

  } else 
  {
    response.error('invalid activation token',STATUS_CODE_FORBIDDEN);
    return response.send(res);
  }
};

export const managerSignIn = async (req, res) => {
  const response = new Responsender();
  const rows = await select('managerid', 'manager', `email='${req.body.email}'`);

  response.successfully(STATUS_CODE_OK, `'${req.body.email} is successfully logged in'`, {
    token: tokenEncrypter(rows[0].managerid),
  });
  return response.send(res);
};
export const managerResetPass= async (req,res)=>{
  const response = new Responsender();
  const CreatedAccCode=randomstring.generate(10);
  await insert('ResetToken', 'token,email,status', '$1, $2,$3',[CreatedAccCode,req.body.email,'ACTIVE']);
  let output=`There was a request to change your password! If you did not make this request then please ignore this email.
  Otherwise, please click this link to change your password: click <a href="localhost/auth/reset/${CreatedAccCode}">here<a/>`;
  sendMail(req.body.email,output,"Reset password");
  response.successfully(STATUS_CODE_CREATED,null,`'reset Email sent to ${req.body.email}'`);
  return response.send(res);

};
export const managerConfirmResetPass=async(req,res)=>{
  const response = new Responsender();
  const isTokenverified = await select('email', 'ResetToken', `token='${req.params.token}' and status='ACTIVE'`);
  if(isTokenverified[0]){
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    update('ResetToken',`status='INACTIVE'`,`token='${req.params.token}'`);
    update('manager',`password='${hashedPassword}'`,`email='${isTokenverified[0].email}'`);
    response.successfully(STATUS_CODE_CREATED,null,'password reset successfully');
    return response.send(res);

  } else 
  {
    response.error('invalid reset token',STATUS_CODE_FORBIDDEN);
    return response.send(res);
  }

};