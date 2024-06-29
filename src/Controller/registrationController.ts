import { Request, Response } from 'express';
import registerServices from '../Services/registration';

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

            return registerServices.registerAccount(newRegistrationData)
                .then((responseFromDB) => {
                    console.log(responseFromDB);
                    res.status(200).send({});
                }).catch(error => {
                    console.log(`Error is: ${error}`)
                });

        }).catch(error => {
            if (error.message === 'User Exists Already with this User Name !' || error.message === 'User Exists Already with this Email !') {
                return res.status(409).json({ message: error.message })
            }
        });
};

export default { register };


