import UserModel from "../Model/userModel";

const getUserDetailsByEmail = (email: string) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ where: { email } })
            .then(user => {
                if (!user) {
                    resolve({ success: false, message: 'User not exists !' })
                } else {
                    resolve({
                        success: true,
                        user: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            userName: user.userName,
                            password: user.password,
                            email: user.email,
                            mobileNumber: user.mobileNumber
                        }
                    });
                }
            }).catch(error => {
                console.error(`Error in fetching the details: ${error}`);
                reject({ success: false });
            })
    })
}

const updateUserDetailsByEmail = (profileToUpdate: any) => {
    return new Promise((resolve, reject) => {
        UserModel
            .update(profileToUpdate, { where: { email: profileToUpdate.email } })
            .then((responseAfterUpdateProfile) => {
                resolve({ success: true });
            })
            .catch(error => {
                console.error(`Error in updating the details: ${error}`);
                reject({ success: false });
            })
    })

}

export default { getUserDetailsByEmail, updateUserDetailsByEmail }