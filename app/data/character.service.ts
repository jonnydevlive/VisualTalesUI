import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {Pose} from './data';
import {VisualTalesHttpService} from '../http/http';

@Injectable()
export class CharacterService {
  private _charactersPath:any[] = ['characters']
  
  constructor(private _visualTalesHttp:VisualTalesHttpService) {}
  
  getCharacter(id:number):Observable<Character>{
    return this._visualTalesHttp.get<Character>(this._charactersPath, id); 
  }
  
  updateCharacter(payload:any):Observable<Character>{
    return this._visualTalesHttp.update<Character>(this._charactersPath, payload);
  }
  
  deleteCharacter(id:number):Observable<{}>{
    return this._visualTalesHttp.delete(this._charactersPath, id);
  }
  
  getPosesForCharacter(id:number):Observable<Pose[]>{
    return this._visualTalesHttp.getAll<Pose>(this.getPosesPath(id));
  }
  
  addPoseToCharacter(id:number, pose:Pose):Observable<Pose>{
    return this._visualTalesHttp.create<Pose>(this.getPosesPath(id), pose);
  }
  
  private getPosesPath(id:number):any[]{
    return this._charactersPath.concat([id, 'poses']);
  }
}

export interface Character{
  id?:number;
  name:string;
  description?:string;
}