import { select } from '../helpers/sqlQueries.js';

export default async (req, res, next) => {
  const rows = await select('email', 'manager', `email='${req.body.email}'`);
  if (!rows[0]) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid email',
    });
  } else next(); 

}