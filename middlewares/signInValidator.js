
import bcrypt from 'bcrypt';
import { select } from '../helpers/sqlQueries.js';

export default async (req, res, next) => {
  const rows = await select('email, password', 'manager', `email='${req.body.email}' and status='ACTIVE' `);
  if(rows[0]){

  const rows = await select('email, password', 'manager', `email='${req.body.email}'`);
  if (!rows[0]) {
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  }
  bcrypt.compare(req.body.password, rows[0].password, (err, userPassword) => {
    if (userPassword) {
      return next();
    }
    return res.status(401).json({
      status: 401,
      error: 'Invalid email or password',
    });
  });

} else return res.status(401).json({
  status: 401,
  error: 'unACTIVE account',
});

};


