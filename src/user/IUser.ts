import IMedia from "media/IMedia";
import IBase from ".base/IBase";

export default interface IUser extends IBase {
  username: string;
  fullname: string;
  email: string;
  image?: string;
  password?: string;
  password2?: string;
}