import dotenv  from "dotenv";
import  express  from "express";
dotenv.config();
const app = express();
import Router from "./routes/index.route.js";
app.use('/',Router);
export  default app;