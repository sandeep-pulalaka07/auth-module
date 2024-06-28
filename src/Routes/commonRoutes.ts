import express, { Request, Response, Router } from 'express';

const commonRouter: Router = express.Router();

commonRouter.get('/getTestResponse', (req: Request, res: Response) => {
    res.status(200).json({ id: 1, name: 'baalu' });
});

commonRouter.post('/login', (req: Request, res: Response) => {
    const bodyVariables = req.body;
    console.log('Body params are:', bodyVariables);
    res.status(200).json({ message: 'Successfully Logged In !!' });
});

export default commonRouter;