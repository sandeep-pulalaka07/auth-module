import { Request, Response } from 'express';
import registerServices from '../Services/registration';
import User from '../Types/user';

const register = (req: Request, res: Response) => {
    const newRegistrationData = req.body;
    registerServices.isAccountExists(newRegistrationData.userName, newRegistrationData.email)
        .then(({ userExists, emailExists }) => {
            if (userExists) {
                throw new Error('User Exists Already with this User Name !');
            }

            if (emailExists) {
                throw new Error('User Exists Already with this Email !');
            }

            return registerServices.hashPassword(newRegistrationData.password);
        }).then(async (hashedPassword: string) => {
            newRegistrationData.password = hashedPassword;
            newRegistrationData.isActive = true;
            return await registerServices.registerAccount(newRegistrationData)
                .then((responseFromDB: User) => {
                    res.status(200).send({ message: 'Successfully Registered !' });
                }).catch(error => {
                    console.log(`Error is: ${error}`);
                    res.send(409).json({ message: error.message });
                });

        }).catch(error => {
            if (error.message === 'User Exists Already with this User Name !' || error.message === 'User Exists Already with this Email !') {
                return res.status(409).json({ message: error.message })
            }
        });
};

export default { register };


