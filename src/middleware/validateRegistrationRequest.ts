import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateRegistrationRequest = (userSchema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    }
}

export default validateRegistrationRequest;