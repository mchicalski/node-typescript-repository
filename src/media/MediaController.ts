import Controller from '../.base/Controller';
// import IMedia from "./IMedia";
// import IMediaModel from "./IMediaModel"
import MediaRepository from "./MediaRepository"
import { Request, Response, Router } from "express";

export default class MediaController extends Controller<MediaRepository> {

  rules = {
    title: 'required|string|max:32',
    description: 'string|max:256',
    image: 'string',
    type: `required`,
    src:  'required|url'
  };

  constructor () {
    super(new MediaRepository());
    this.router.route('/').get(this.findAll);
    this.router.route('/').post(this.create);
    // this.router.route('/:_id').get(this.findOne);
  }

  foo = () => this.repository.foo();
}

export const mediaController =  new MediaController();