import pool from '../config/dbConfig.js';


const createTables = `
DROP TABLE IF EXISTS employee, manager,ResetToken;
CREATE TABLE IF NOT EXISTS employee(
    employeeId SERIAL PRIMARY KEY,
    email VARCHAR(30)  NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    code VARCHAR(7) NOT NULL,
    nationalId VARCHAR(16) UNIQUE NOT NULL,
    Phone VARCHAR(30) NOT NULL,
    dob  DATE NOT NULL,
    Position VARCHAR(30) NOT NULL,
    CreateDate DATE DEFAULT(NOW()) NOT NULL,
    Status VARCHAR(10) NOT NULL
);
CREATE TABLE IF NOT EXISTS manager(
  managerId SERIAL PRIMARY KEY,
  email VARCHAR(30) UNIQUE NOT NULL,
  firstName VARCHAR(20) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
  password VARCHAR(300) NOT NULL,
  nationalId VARCHAR(16) UNIQUE NOT NULL,
  Phone VARCHAR(30) NOT NULL,
  dob  DATE NOT NULL,
  Position VARCHAR(30) NOT NULL,
  token VARCHAR(7) NOT NULL,
  status VARCHAR(20) NOT NULL
 
  
  );

  CREATE TABLE IF NOT EXISTS ResetToken(
    resetTokenId SERIAL PRIMARY KEY,
    email VARCHAR(30)  NOT NULL,
    token VARCHAR(10) UNIQUE NOT NULL,
    status VARCHAR(20) NOT NULL
   
    
    );

  `;

pool.query(createTables).then(() => {
  pool.end();
}).catch((err) => {
  process.stdout.write(err.message);
  process.exit(0);
});

process.stdout.write(' + Tables Created successfully');
