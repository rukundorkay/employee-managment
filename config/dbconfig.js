import '../loadEnv.js';
import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    user:'postgres',
    host:'127.0.0.1',
    database:'awesomitychallenge',
    password:'primus',
    port:5432,
  });
pool.on('connect', () => {
  console.log(' + Connected to Postgress database...');
});


export default pool;
