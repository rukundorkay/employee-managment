import Joi from 'joi';
import validate from '../helpers/joiHandlers.js';


const signupValidation = (req,res,next)=>{
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
            
            
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    
       
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        nationalid : Joi.string().required(),
            //   .pattern(new RegExp('^[1-3](19|20)\d{2}[7-8]\d{7}[0-9]\d{2}$')),
              

        phone : Joi.string()
                // .pattern(new RegExp('^(\+?25)?(078|079|075|073|072)\d{7}$'))
                .required(),

        DOB : Joi.string()
               .required(),

        


        
    }) 

    const result = validate(schema,req.body,res);
   if(!result.error) next();
    
 
}
export default signupValidation;
