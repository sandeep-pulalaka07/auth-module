import { Request, Response } from 'express';
import profileService from '../Services/profile';
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
}

const getUserDeatils = (req: Request, res: Response) => {
    const emailToFetchUserDetails: string = req.params.email || '';
    profileService.getUserDetailsByEmail(emailToFetchUserDetails)
        .then(fetchUserDetailsResponse => {
            res.status(200).json(fetchUserDetailsResponse);
        }).catch(error => {
            console.error(`Error in fetching the details: ${error}`);
            res.status(500).json({ success: false, message: 'Error in fetching the details' });
        })
}

const updateUserDetails = (req: Request, res: Response) => {
    const profileToUpdate = {
        "firstName": req.body.firstname,
        "lastName": req.body.lastname,
        "userName": req.body.username,
        "password": req.body.password,
        "email": req.body.email,
        "mobileNumber": req.body.mobilenumber
    };

    hashPassword(profileToUpdate.password)
        .then((hashedPassword: string) => {
            profileToUpdate.password = hashedPassword;
            profileService.updateUserDetailsByEmail(profileToUpdate)
                .then((updateProfileResponse: any) => {
                    res.status(200).json(updateProfileResponse);
                })
                .catch(error => {
                    console.error(`Error in updating the details: ${error}`);
                    res.status(500).json({ success: false, message: 'Error in updating the details' });
                })
        })
        .catch(error => {
            console.error(`Error in Encrypting the password: ${error}`);
            res.status(500).json({ success: false, message: 'Error in password Encryption !' });
        })
}

export default { getUserDeatils, updateUserDetails }