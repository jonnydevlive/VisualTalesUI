import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Settings} from '../settings';

@Injectable()
export class VisualTalesHttpService {
  private _putPostHeaders:Headers;
  private _url:string;
  
  constructor(private _http:Http) {
    this._url = Settings.API_URL;
    this._putPostHeaders = new Headers();
    this._putPostHeaders.append('Content-Type', 'application/json');
  }
  
  get<T>(resourcePath:any[], id:number):Observable<T>{
    return this._http.get(`${this.getResourceUrl(resourcePath)}/${id}`)
                .map(res => <T> res.json())
                .catch(this.logError);
  }
  
  getAll<T>(resourcePath:any[], params?:any):Observable<T[]>{
    let urlParams:URLSearchParams = this.getUrlParams(params);    
    
    return this._http.get(this.getResourceUrl(resourcePath), {search:urlParams})
               .map(res => res.status === 204 ? []:<T[]> res.json())
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
              `${this.getResourceUrl(resourcePath)}/${payload.id}`,
              JSON.stringify(payload), 
              {headers: this._putPostHeaders}
            )
            .map(res => <T> res.json())
            .catch(this.logError);
  }
  
  create<T>(resourcePath:any[], payload:T):Observable<T>{
    return this._http.post(
              this.getResourceUrl(resourcePath),
              JSON.stringify(payload),
              {headers: this._putPostHeaders}
           )
           .map(res => <T> res.json())
           .catch(this.logError);
  }
  
  delete(resourcePath:any[], id:number):Observable<{}>{
    return this._http.delete(this.getResourceUrl(resourcePath))
           .map(res => res.json())
           .catch(this.logError);
  }
  
  private getResourceUrl(resourcePath:any[]):string{
    return `${this._url}/${resourcePath.join('/')}`;
  }
  
  private logError(error: Error){
    console.log(error);
    return Observable.throw(error);
  }
}