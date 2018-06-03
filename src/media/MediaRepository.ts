import Repository from '../.base/Repository';
import IMedia from './IMedia';
import IMediaModel from './IMediaModel';
import MediaModel from './MediaModel';

export default class MediaRepository extends Repository<IMediaModel, IMedia> {
  
  constructor () {
    super(MediaModel);
  }
  
  foo () {
    
  }

  addToFavorites (mediaId: any, userId: any) {

  }
}