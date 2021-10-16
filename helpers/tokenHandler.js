import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const tokenEncrypter=(uuid)=>{
      const token = jwt.sign({uuid,},process.env.JWT_KEY,{expiresIn: '30d',});
      return token;
}

export const tokenDecrypter=(token)=>{
    const uuid = jwt.verify(token,process.env.JWT_KEY);
    return uuid;
}

