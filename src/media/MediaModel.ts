import { Document, Schema } from "mongoose";
import db from "../db";
import IMediaModel from "./IMediaModel";

let schema =  new Schema({
  title : {
    type: String,
    required: true,
    trim: true
  },
  slug : {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String,
    required: false,
    trim: true
  },
  src : {
    type: String,
    required: true,
    trim: true
  },
  type : {
    type: String,
    required: true
  }
});
const MediaModel = db.model<IMediaModel>("Media", schema);
export default MediaModel
