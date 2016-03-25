import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {VisualTalesHttpService} from '../http/http';

@Injectable()
export class TagService {
  private _tagsPath:any[] = ['tags'];
  
  constructor(private _visualTalesHttp:VisualTalesHttpService) {}

  getTags(tagName=''):Observable<Tag[]>{
    let params:any = {};
    
    if(tagName.length > 0){
      params.query = tagName;
    }
    
    return this._visualTalesHttp.getAll<Tag>(this._tagsPath, params);
  }
  
  createTag(tag:Tag){
    return this._visualTalesHttp.create<Tag>(this._tagsPath, tag);
  }
}

export interface Tag{
  id?:number;
  name:string;
}
