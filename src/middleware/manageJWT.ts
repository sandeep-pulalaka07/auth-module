import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;

const generateJWTToken = (email: string): string => {
    return jwt.sign({ email: email }, JWT_SECRET_KEY, { expiresIn: '1h' });
}

const validateJWTToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenFromUser: string = req.headers.token + '';
        const isValid = jwt.verify(tokenFromUser, JWT_SECRET_KEY)
        if (isValid) {
            next();
        } else {
            res.status(401).send({ message: 'Sorry, Bad request !!' });
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: 'Invalid Token, Please login again !!' });
    }
}

export default { generateJWTToken, validateJWTToken }