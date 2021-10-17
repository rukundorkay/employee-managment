import '../loadEnv.js';
import pkg from 'pg';
const { Pool } = pkg;


const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    
  });
pool.on('connect', () => {
  console.log(' + Connected to Postgress database...');
});


export default pool;
