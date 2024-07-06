import UserModel from '../Model/userModel';
import bcrypt from 'bcrypt';
import manageJWT from '../middleware/manageJWT';


interface LoginCredentials {
    email: string;
    password: string;

}

interface AuthResponse {
    success: boolean;
    firstname?: string;
    role?: string;
    message?: string;
    token?: string
}

const authenticateUser = ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ where: { email } })
            .then((user) => {
                if (!user) {
                    resolve({ success: false, message: 'User not exists !' })
                } else {
                    bcrypt.compare(password, user.password).then((isPasswordValid: boolean) => {
                        if (!isPasswordValid) {
                            resolve({ success: false });
                        } else {
                            const token: string = manageJWT.generateJWTToken(user.email);
                            resolve({ success: true, role: user.userRole, firstname: user.firstName, token: token });
                        }
                    })

                }
            }).catch((error: any) => {
                console.log(`Error is: ${error}`);
                reject({ success: false });
            })
    })
}

export default { authenticateUser };