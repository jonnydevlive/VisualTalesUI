import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Settings} from '../settings';

@Injectable()
export class VisualTalesHttpService {
  private _putPostHeaders:Headers;
  private _url:string;
  
  constructor(private _http:Http) {
    this._putPostHeaders = new Headers();
    this._putPostHeaders.append('Content-Type', 'application/json');
  }
  
  get<T>(resourcePath:any[], id:number):Observable<T>{
    return this._http.get(`${resourcePath.join('/')}/${id}`)
                .map(res => <T> res.json())
                .catch(this.logError);
  }
  
  getAll<T>(resourcePath:any[], params?:any):Observable<T[]>{
    let urlParams:URLSearchParams = this.getUrlParams(params);    
    
    return this._http.get(resourcePath.join('/'), {search:urlParams})
               .map(res => <T[]> res.json())
               .catch(this.logError);
  }
  
  private getUrlParams(params:any):URLSearchParams{
    let urlParams:URLSearchParams = new URLSearchParams();
    
    if(!params){
      return urlParams;
    }
    
    return Object.keys(params)
                .reduce(function(searchParams, keyName){
                  searchParams.set(keyName, params[keyName]);
                  return searchParams;
                }, urlParams);
  }
  
  update<T>(resourcePath:any[], payload:any):Observable<T>{
    return this._http.put(
              `${resourcePath.join('/')}/${payload.id}`,
              JSON.stringify(payload), 
              {headers: this._putPostHeaders}
            )
            .map(res => <T> res.json())
            .catch(this.logError);
  }
  
  create<T>(resourcePath:any[], payload:T):Observable<T>{
    return this._http.post(
              resourcePath.join('/'),
              JSON.stringify(payload),
              {headers: this._putPostHeaders}
           )
           .map(res => <T> res.json())
           .catch(this.logError);
  }
  
  delete(resourcePath:any[], id:number):Observable<{}>{
    return this._http.delete(resourcePath.join('/'))
           .map(res => res.json())
           .catch(this.logError);
  }
  
  private logError(error: Error){
    console.log(error);
    return Observable.throw(error);
  }
}