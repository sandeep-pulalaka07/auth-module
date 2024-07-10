import express, { Request, Response, Router } from 'express';
import profileController from '../Controller/profileController';
import manageJWT from '../middleware/manageJWT';

const profileRouter: Router = express.Router();

profileRouter.get('/getUserDetails/:email', manageJWT.validateJWTToken, profileController.getUserDeatils);
profileRouter.put('/updateUserDetails', profileController.updateUserDetails);

export default profileRouter;