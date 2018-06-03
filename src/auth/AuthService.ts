import userRepository from "user/UserRepository";
import IUser from "user/IUser";

export default class AuthService {
  signin = (email: string, password: string): IUser =>
    userRepository.$findOne({ email })
      .then(user => {
        if (user === null) return '';
        if (user.validPassword(password)) return user;
        return false;
      })
  
  signout = () => console.log;
  signup = (user: IUser) => console.log;
}
