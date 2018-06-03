import IUser from "./IUser";
import { Document } from "mongoose";

export default interface IUserModel extends Document, IUser {

}