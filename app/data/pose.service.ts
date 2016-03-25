import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {VisualTalesHttpService} from '../http/http';

@Injectable()
export class PoseService {
  private _posesPath:any[] = ['poses'];
  
  constructor(private _visualTalesHttp:VisualTalesHttpService) {}
  
  updatePose(payload:any):Observable<Pose>{
    return this._visualTalesHttp.update(this._posesPath, payload);
  }
  
  deletePose(id:number):Observable<{}>{
    return this._visualTalesHttp.delete(this._posesPath, id);
  }
}

export interface Pose{
  id?:number;
  name:string;
}