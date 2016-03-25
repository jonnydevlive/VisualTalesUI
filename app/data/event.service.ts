import {Injectable} from 'angular2/core';

import {Observable} from 'rxjs/Observable';

import {VisualTalesHttpService} from '../http/http';

@Injectable()
export class EventService {
  private _eventsPath:any[] = ['events'];
  
  constructor(private _visualTalesHttp:VisualTalesHttpService) {}

  updateEvent(payload:any):Observable<Event>{
    return this._visualTalesHttp.update(this._eventsPath, payload);
  }
  
  deleteEvent(id:number):Observable<{}>{
    return this._visualTalesHttp.delete(this._eventsPath, id);
  }
}

export interface Event{
  id?:number;
  order:number;
  positionX?:number;
  positionY?:number;
  pose_id?:number;
}