import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers, RequestOptions, RequestMethod, Response} from 'angular2/http';

import {Observable} from 'rxjs/Observable';

import {Settings} from '../settings';
import {AuthenticationService} from './http';

@Injectable()
export class VisualTalesHttpService {
  private _headers:Headers;
  private _url:string;
  private _tokenRequest$:Observable<void>;
  
  constructor(private _http:Http, private _authenticationService:AuthenticationService) {
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }
  
  get<T>(resourcePath:any[], id:number):Observable<T>{
    let requestOptions:RequestOptions = this.getRequestOptions(RequestMethod.Get);
    
    return this.request(`${resourcePath.join('/')}/${id}`, requestOptions)
                .map(res => <T> res.json())
                .catch(this.logError);
  }
  
  getAll<T>(resourcePath:any[], params?:any):Observable<T[]>{
    let urlParams:URLSearchParams = this.getUrlParams(params);    
    
    let requestOptions:RequestOptions = this.getRequestOptions(RequestMethod.Get, {urlParams:urlParams});
    
    return this.request(resourcePath.join('/'), requestOptions)
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
    let requestOptions:RequestOptions = this.getRequestOptions(RequestMethod.Put, {payload:payload});
    
    return this.request(`${resourcePath.join('/')}/${payload.id}`, requestOptions)
            .map(res => <T> res.json())
            .catch(this.logError);
  }
  
  create<T>(resourcePath:any[], payload:T):Observable<T>{
    let requestOptions:RequestOptions = this.getRequestOptions(RequestMethod.Post, {payload:payload})
    
    return this.request(resourcePath.join('/'), requestOptions)
           .map(res => <T> res.json())
           .catch(this.logError);
  }
  
  delete(resourcePath:any[], id:number):Observable<{}>{
    return this.request(resourcePath.join('/'))
           .map(res => res.json())
           .catch(this.logError);
  }
  
  private getRequestOptions(requestMethod:RequestMethod, {urlParams, payload}:{urlParams?:URLSearchParams, payload?:{}}={}):RequestOptions{
    let requestOptions:RequestOptions = new RequestOptions({
      method: requestMethod,
      headers: this._headers
    });
    
    if(urlParams){
      requestOptions.search = urlParams;
    }
    
    if(payload){
      requestOptions.body = JSON.stringify(payload);
    }
    
    return requestOptions;
  }
  
  private request(url:string, requestOptions?:RequestOptions):Observable<Response>{
    let request$:Observable<Response> = this._http.request(`${Settings.API_URL }/${url}`, requestOptions); 
    return this.getAuthenticatedRequest(request$);
  }
  
  private getAuthenticatedRequest(request$:Observable<Response>):Observable<Response>{
    if(!this._headers.has('X-Authorization')){
      if(!this._tokenRequest$){
        this._tokenRequest$ = this._authenticationService.authenticateGuestUser()
          .map((res:any) => { this._headers.set('X-Authorization', res.auth_token); } )
      } 
      
      return this._tokenRequest$.flatMap(() => request$);
    }
    
    return request$;
  }
  
  private logError(error: Error){
    return Observable.throw(error);
  }
}