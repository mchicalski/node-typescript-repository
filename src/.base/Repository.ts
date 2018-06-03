import { Model, Document, DocumentQuery } from 'mongoose';
import IBase from "./IBase";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
        [K in Keys]-?: Required<Pick<T, K>>
    }[Keys]
    
export default abstract class Repository<T extends Document, U extends IBase> {
    
  public readonly model: Model<T>;
  
  constructor (model: Model<T>) {
      this.model = model;
  }

  create = (item: U): Promise<T> =>
    this.model
      .create(item);

  addToSet = (_id: any, set: String, itemToAdd: any): Promise<any> => 
    this.model
      .findOneAndUpdate(
        { _id },
        { $addToSet:
          { set: itemToAdd }
        },
        { new: true }
      )
      .lean()
      .exec()
  
  update = (_id: any, item: U): Promise<U> =>
    this.model
      .findOneAndUpdate(
        { _id },
        item
      )
      .lean()
      .exec()

  find = (item?: U): Promise<U[]> =>
    this.model
      .find()
      .lean()
      .exec();

  findAll = (skip: number = 0, limit: number = 20): Promise<U[]> =>
    this.model
      .find()
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  
  findOne = (query: RequireAtLeastOne<U>): Promise<U> =>
    this.model
      .findOne(query)
      .lean()
      .exec();

  findBy = (query: RequireAtLeastOne<U> | 'id'): Promise<U[]> =>
    this.model
      .find(query)
      .lean()
      .exec();

  findOneBy = (query: RequireAtLeastOne<U>): Promise<U> =>
    this.model
      .findOne(query)
      .lean()
      .exec();
  
  deleteOne = (_id: any): Promise<T> =>
      this.model
        .deleteOne({ _id })
        .exec()

  search = (q: String, skip: number = 0, limit: number = 20): Promise<U[]> =>
    this.model
      .find(
        { $text:
          { $search: q }
        }
      )
      .lean()
      .exec();
    
}
