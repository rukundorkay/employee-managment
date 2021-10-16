import  express  from 'express';
import signupValidation from '../validators/signUpValidator.js';
import checkmanager from '../middlewares/checkmanager.js';
import { managerSignUp ,managerActivateAcc,managerSignIn,managerResetPass,managerConfirmResetPass} from '../controllers/manager.js';
import signInValidator from '../middlewares/signInValidator.js';
import emailValidator from '../middlewares/emailValidator.js';
import resetpassvalidator from '../validators/resetpassvalidator.js';
const router =express.Router();
router.post('/signup',[signupValidation,checkmanager],managerSignUp);
router.get('/activate/:token',managerActivateAcc)
router.post('/signin',signInValidator,managerSignIn);
router.post('/resetPassword',emailValidator,managerResetPass);
router.patch('/resetPassword/confirm/:token',resetpassvalidator,managerConfirmResetPass);
export default router;