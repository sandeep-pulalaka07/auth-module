import UserModel from '../Model/userModel';


const isAccountExists = (userName: string, email: string) => {
    const userExists = UserModel.findOne({ where: { userName: userName } }).then(user => !!user);
    const emailExists = UserModel.findOne({ where: { email: email } }).then(user => !!user);
    return Promise.all([userExists, emailExists]).then(([userExists, emailExists]) => ({ userExists, emailExists }));
}




const registerAccount = (userData: any) => {
    return UserModel.create(userData);
}

export default { isAccountExists, registerAccount }