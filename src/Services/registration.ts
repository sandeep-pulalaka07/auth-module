import UserModel from '../Model/userModel';
import User from '../Types/user';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;


const isAccountExists = async (userName: string, email: string): Promise<any> => {
    const userExists = await UserModel.findOne({ where: { userName: userName } }).then(user => !!user);
    const emailExists = await UserModel.findOne({ where: { email: email } }).then(user => !!user);
    return Promise.all([userExists, emailExists]).then(([userExists, emailExists]) => ({ userExists, emailExists }));
}

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

const registerAccount = async (userData: User): Promise<UserModel> => {
    return await UserModel.create(userData);
}

export default { isAccountExists, registerAccount, hashPassword }