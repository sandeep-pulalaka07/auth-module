import { Request, Response } from 'express';
import loginService from '../Services/login';

const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    loginService.authenticateUser({ email, password })
        .then((authenticateResponse) => {
            res.status(200).json(authenticateResponse)
        }).catch((error) => {
            console.log(`Error is: ${error}`);
            res.status(401).json({ success: false, message: error.message });
        })
}

export default { login };
