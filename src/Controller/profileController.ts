import { Request, Response } from 'express';
import profileService from '../Services/profile';

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

const updateUserDetails = () => {

}

export default { getUserDeatils, updateUserDetails }