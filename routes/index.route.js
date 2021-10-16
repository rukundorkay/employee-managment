import express from 'express';
import employee from './employee.route.js';
import manager from './manager.route.js';
const app =express();
app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.end(`<h1>WELCOME TO AWESOMITY CHALLENGE </h1>`);
  });
  app.use(express.json()); 
  app.use('/auth/',manager);
  app.use('/api/',employee);

export default app;

