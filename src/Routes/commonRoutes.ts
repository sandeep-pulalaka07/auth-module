import express, { Request, Response, Router } from 'express';
import registrationController from '../Controller/registrationController';
import loginController from '../Controller/loginController';
import validateRegistrationRequest from '../middleware/validateRegistrationRequest';
import userSchema from '../middleware/schemas/userSchema';

const commonRouter: Router = express.Router();

commonRouter.get('/getTestResponse', (req: Request, res: Response) => {
    res.status(200).json({ id: 1, name: 'baalu' });
});

commonRouter.post('/login', loginController.login);
commonRouter.post('/register', validateRegistrationRequest(userSchema), registrationController.register);

export default commonRouter;