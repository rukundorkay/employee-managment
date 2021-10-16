import Responsender from '../helpers/responseHandler.js';
import { select } from '../helpers/sqlQueries.js';
import { STATUS_CODE_FORBIDDEN } from '../helpers/statusHandler.js';
import { tokenDecrypter } from '../helpers/tokenHandler.js';

export default async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = tokenDecrypter(token);
  req.userData = decodedToken;
  const rows = await select('*', 'manager', `managerid='${req.userData.uuid}'`);
  if (rows.length === 0) {
    const response = new Responsender();
    response.error('Sorry: This token does not belong to a valid user',STATUS_CODE_FORBIDDEN);
    return response.send(res);
  }
  next();
  
};
