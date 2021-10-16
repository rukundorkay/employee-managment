import Responsender from '../helpers/responseHandler.js';
import { UNAUTHORIZED_STATUS_CODE } from '../helpers/statusHandler.js';
import { tokenDecrypter } from '../helpers/tokenHandler.js';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken =tokenDecrypter(token);
    req.userData = decodedToken;
    
    next();
  } catch (error) {
    const response = new Responsender();
    response.error('Forbidden: You must login to proceed',UNAUTHORIZED_STATUS_CODE );
    return response.send(res);
  }
};
