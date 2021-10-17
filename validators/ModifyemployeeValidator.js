import Joi from 'joi';
import validate from '../helpers/joiHandlers.js';

const date18YearsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);
const employeeModifyValidation = (req,res,next)=>{
const schema = Joi.object({
        FirstName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            ,
        LastName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            ,
            
            nationalid : Joi.string()
            .required()
            .pattern(new RegExp('^(1|2|3)[0-9]{4}(7|8)[0-9]{7}[0-9]{1}[0-9]{2}$'))
            .message("invalid ID"),
  

        phone : Joi.string()
            .required()
            .pattern(new RegExp('^(078|079|075|073|072)[0-9]{7}$'))
            .message("invalid phone number , should look like(0788232421)"),
            

        DOB : Joi.date()
            .max(date18YearsAgo)
            .message("Employee must be above 18 years")
        ,

        position:Joi.string()
                 .required()

        }) 

    const result = validate(schema,req.body,res);
   if(!result.error) next();
    
 
}
export default employeeModifyValidation;
