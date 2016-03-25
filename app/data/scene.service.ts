import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {Event} from './data';
import {VisualTalesHttpService} from '../http/http';

@Injectable()
export class SceneService {
  private _scenesPath:any[] = ['scenes'];
  
  constructor(private _visualTalesHttp:VisualTalesHttpService) {}
  
  updateScene(payload:any):Observable<Scene>{
    return this._visualTalesHttp.update<Scene>(this._scenesPath, payload);
  }
  
  deleteScene(id:number):Observable<{}>{
    return this._visualTalesHttp.delete(this._scenesPath, id);
  }
  
  getEventsForScene(id:number):Observable<Event[]>{
    return this._visualTalesHttp.getAll<Event>(this.getEventsPath(id));
  }
  
  addEventToScene(id:number, payload:any):Observable<Event>{
    return this._visualTalesHttp.create<Event>(this.getEventsPath(id), payload);
  }
  
  private getEventsPath(id:number):any[]{
    return this._scenesPath.concat([id, 'events']);
  }
}

export interface Scene{
  id?:number;
  name:string;
}