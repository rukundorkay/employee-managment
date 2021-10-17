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


    INSERT INTO manager(
      email, firstName, lastName, password,nationalid,phone,dob,position,token,status
     )VALUES('rukundojanvier250@gmail.com', 'muraxa', 'claire', '$2b$10$IkR383V4b/Rbore/yavYKuasHSb5PnffBBmU0Mzal7rJRBjNoTA1a','120009090903020','078520902','2000-12-31','MANAGER','ITMcFcB','ACTIVE');

     INSERT INTO employee(
      email, firstName, lastName,code,nationalid,phone,dob,position,createdate,status
     )VALUES('rukundojanvier250@gmail.com', 'muraxa', 'claire','EMP-jIt','120009090903020','078520902','2000-12-31','MANAGER','2020-12-31','ACTIVE');

  `;

  
  

pool.query(createTables).then(() => {
  pool.end();
}).catch((err) => {
  process.stdout.write(err.message);
  process.exit(0);
});

process.stdout.write(' + Tables Created successfully');
