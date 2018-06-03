import { srcTypes } from "./srcTypes";

export default interface IMedia {
  id?: any;
  title: string;
  description?: string;
  image?: string;
  src: string;
  type: srcTypes;
}