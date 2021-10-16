import  {select} from '../helpers/sqlQueries.js'
import{UNPROCESSABLE_ENTITY_STATUS_CODE} from'../helpers/statusHandler.js';
import Responder from '../helpers/responseHandler.js';


export default async(req,res,next)=>{
    const response = new Responder();
  
    const rows = await select('email', 'employee', `nationalid='${req.body.nationalid}'`);
  if (rows[0]) {
    response.error('employee already exists',UNPROCESSABLE_ENTITY_STATUS_CODE);
    return response.send(res);
    
  }else next();


    
};

