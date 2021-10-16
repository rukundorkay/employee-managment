import {STATUS_CODE_OK,STATUS_CODE_CREATED,STATUS_CODE_FORBIDDEN,STATUS_NO_CONTENT,UNPROCESSABLE_ENTITY_STATUS_CODE,
    UNAUTHORIZED_STATUS_CODE,BAD_REQUEST_STATUS_CODE,NOT_FOUND_STATUS_CODE} from './statusHandler.js';
import Responder from'./responseHandler.js';
    

  const validate= (schema,body,res)=>{
    const response =new Responder;
    const value =  schema.validate(body);
    if(value.error){
     response.error(value.error.details[0].message,BAD_REQUEST_STATUS_CODE)
     response.send(res);
   
     }

     return value;
    
        
        }



 export  default validate;