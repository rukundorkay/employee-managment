import  express  from 'express';
import checkAuth from '../validators/checkAuth.js';
import employeeValidation from '../validators/employeeValidator.js';
import checkValidManager from '../middlewares/checkValidManager.js';
import { employeeCreate,employeeModify,employeeSuspend,employeeActivate,employeeRemove,employeeSearch } from '../controllers/employee.js';
import checkEmployee from '../middlewares/checkEmployee.js';
import checkEmployeeAvailability from '../middlewares/checkEmployeeAvailability.js';
import employeeModifyValidation from '../validators/modifyemployeevalidator.js';

const router =express.Router();
router.post('/employee', [checkAuth, checkValidManager, employeeValidation,checkEmployee], employeeCreate);
router.patch('/employee/:id',[checkAuth,checkValidManager,checkEmployeeAvailability,employeeModifyValidation],employeeModify);
router.patch('/employee/suspend/:id',[checkAuth,checkValidManager,checkEmployeeAvailability],employeeSuspend );
router.patch('/employee/activate/:id',[checkAuth,checkValidManager,checkEmployeeAvailability],employeeActivate );
router.delete('/employee/:id',[checkAuth,checkValidManager,checkEmployeeAvailability],employeeRemove);
router.get('/employee/search/:q',[checkAuth,checkValidManager],employeeSearch)


export default router;