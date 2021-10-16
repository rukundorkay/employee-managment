import express from 'express';
import Responsender from '../helpers/responseHandler.js';
import { insert, select,update,remove } from '../helpers/sqlQueries.js';
import { STATUS_CODE_CREATED, STATUS_CODE_FORBIDDEN, STATUS_CODE_OK } from '../helpers/statusHandler.js';
import { sendMail } from '../helpers/mailerHandler.js';
import randomstring  from 'randomstring';


const app = express();
app.use(express.json);

export const employeeCreate = async (req, res) => {
  const response = new Responsender();
   const CreatedAccCode=randomstring.generate(7);
  class employee {
    constructor() {
      this.firstName = req.body.FirstName;
      this.lastName = req.body.LastName;
      this.email = req.body.email;
      this.code = CreatedAccCode;
      this.ID=req.body.nationalid;
      this.phone=req.body.phone;
      this.DOB=req.body.DOB;
      this.position=req.body.position;
      this.status='ACTIVE';
    }
  }

  const newemployee= new employee();

  await insert('employee', 'email, firstname, lastname,code,nationalid,phone,DOB,position,status', '$1, $2, $3, $4,$5,$6,$7,$8,$9',
    [newemployee.email, newemployee.firstName,newemployee.lastName,newemployee.code,newemployee.ID,newemployee.phone,newemployee.DOB,newemployee.position,newemployee.status]);
  const idDone = await select('employeeid, email', 'employee', `email='${req.body.email}'`);
  let output=`<B>dear ${req.body.FirstName}</B><BR>  welcome to Awesomity As new Employee  `;
  sendMail(req.body.email,output,"New employee")
  response.successfully(STATUS_CODE_CREATED,null,'employee added successfully');
  return response.send(res);

};

export const employeeModify = async (req, res) => {
  const response = new Responsender();
  await update('employee', `firstname='${req.body.FirstName}', lastname='${req.body.LastName}' , nationalid='${req.body.nationalid}'
   ,phone='${req.body.phone}',DOB='${req.body.DOB}',position='${req.body.position}'`, `employeeid='${req.params.id}'`);
  const rows = await select('firstname,lastname,code', 'employee', `employeeid='${req.params.id}'`);
 

  response.successfully(STATUS_CODE_OK,{
    code: rows[0].code,
    firstName: rows[0].firstname,
    lastName: rows[0].lastname,
  }, 'employee Modified successfully');

   return response.send(res);
 
};

export  const employeeSuspend = async(req,res)=>{
  const response = new Responsender();
  await update('employee', `status='Suspend'`, `employeeid='${req.params.id}'`);
  const rows = await select('firstname,lastname,code', 'employee', `employeeid='${req.params.id}'`);
  response.successfully(STATUS_CODE_OK,{
    code: rows[0].code,
    firstName: rows[0].firstname,
    lastName: rows[0].lastname,
  }, 'employee has been suspended');

   return response.send(res);
 

} ;
export  const employeeActivate = async(req,res)=>{
  const response = new Responsender();
  await update('employee', `status='ACTIVE'`, `employeeid='${req.params.id}'`);
  const rows = await select('firstname,lastname,code', 'employee', `employeeid='${req.params.id}'`);
  response.successfully(STATUS_CODE_OK,{
    code: rows[0].code,
    firstName: rows[0].firstname,
    lastName: rows[0].lastname,
  }, 'employee has been activated');

   return response.send(res);
 

};

export  const employeeRemove = async(req,res)=>{
  const response = new Responsender();
  await remove('employee',`employeeid`, `${req.params.id}`);
  response.successfully(STATUS_CODE_OK,null, 'employee deleted activated');

   return response.send(res);
 

};

export  const employeeSearch = async(req,res)=>{
  const response = new Responsender();
  const rows=await select('*',`employee`, `code='${req.params.q}' or email='${req.params.q}' or phone='${req.params.q}' or firstname='${req.params.q}' or lastname='${req.params.q}'`);
  
  if(!rows[0]){
    response.successfully(STATUS_CODE_OK,null, 'no results found');
     return response.send(res);


  }else{
    const data=JSON.stringify(rows);
    response.successfully(STATUS_CODE_OK,data,
     `'${rows.length} results found'`);
     return response.send(res);

  }
  
  
 

};