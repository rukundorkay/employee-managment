import { select } from '../helpers/sqlQueries.js';
import Responsender from '../helpers/responseHandler.js';
import { NOT_FOUND_STATUS_CODE } from '../helpers/statusHandler.js';

export default async (req, res, next) => {
  const response = new Responsender();
  const rows = await select('employeeid', 'employee', `employeeid='${req.params.id}'`);
  if (!rows[0]) {
    response.error('You do not have any employee with ID ' + `${req.params.id}`,NOT_FOUND_STATUS_CODE);
    return response.send(res);
  }
  next();
};
