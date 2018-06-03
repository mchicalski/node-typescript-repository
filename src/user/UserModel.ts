import { Document, Schema } from "mongoose";
import db from "../db";
import IUserModel from "./IUserModel";
import crypto from "crypto";

let schema =  new Schema({
  username : {
    type: String,
    required: true,
    trim: true
  },
  fullname : {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  },
  hash: {
    type: String,
    select: false
  },
  salt: {
    type: String,
    select: false
  }
});

schema.methods.setPassword = (password): void => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1024, 64, 'sha512').toString('hex');
}

schema.methods.validPassword = (password): boolean =>
  this.hash === crypto.pbkdf2Sync(password, this.salt, 1024, 64, 'sha512').toString('hex');

const UserModel = db.model<IUserModel>("User", schema);

export default UserModel
