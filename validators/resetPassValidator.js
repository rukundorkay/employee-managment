import Joi from 'joi';
import validate from '../helpers/joiHandlers.js';

export default async(req,res,next)=>{
    
    const schema = Joi.object({
       password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).
            required(),
    
    }) 

    const result = validate(schema,req.body,res);
   if(!result.error) next();
    
 
}