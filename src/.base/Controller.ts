import express, { Request, Response, Router } from 'express';
import { Document } from 'mongoose';
import Validator from 'validatorjs';
import Repository from './Repository';
import IBase from "./IBase";

Validator.useLang('pt')

export default abstract class Controller<T extends Repository<Document, IBase>> {
  constructor (repository: T) {
    this.repository = repository;
  }
  repository: T;
  router: Router = express.Router();
  abstract rules: object;

  validate = (obj: any): any =>
    new Validator(obj, this.rules);

  create = async (req: Request, res: Response) => {
    let validation = this.validate(req.body)
    validation.passes() ?
      this.repository
        .create(req.body)
          .then(x => res.json(x))
          .catch(err => res.status(400).json(err))
    :
      res.json(validation.errors.all());
  }

  findAll = (req: Request, res: Response) =>
    this.repository
      .findAll()
        .then(x => res.json(x))
        .catch(err => res.status(400).json(err));
}

// export default abstract class Controller<T extends Document, U> {

//   repository: Repository<T, U>;
//   abstract rules: object;

//   constructor (repo: Repository<T, U>) {
//     this.repository = repo;
//   }

//   findAll = (req: Request, res: Response) =>
//     this.repository
//       .findAll()
//         .then(res.json)
//         .catch(res.status(400).json);

//  create = (req: Request, res: Response) =>
//     this.validate(req.body).passes() ?
//       this.repository
//         .create(req.body)
//           .then(res.json)
//           .catch(res.status(400).json)
//     : 
//       res.status(400).json(
//         this.validate(req.body).erros.all()
//       );

//   search = (req: Request, res: Response) =>
//     this.repository
//       .search(
//         req.query.q,
//         req.query.skip || 0,
//         req.query.limit || 20
//       )
//         .then(res.json)
//         .catch(res.status(400).json)

//   deleteOne = (req: Request, res: Response) =>
//       this.repository
//         .deleteOne(req.params.id)
//           .then(res.json)
//           .catch(res.status(400).json)

//   validate = (obj: U): any =>
//     new Validator(obj, this.rules);

// }