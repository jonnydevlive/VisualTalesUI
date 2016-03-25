import {Injectable} from 'angular2/core';
import {Http, URLSearchParams, Headers, RequestOptions, RequestMethod} from 'angular2/http';

import {Observable} from 'rxjs/Rx';

import {Settings} from '../settings';

@Injectable()
export class AuthenticationService {
  private _authUrl;
  private _headers:Headers;
  
  constructor(private _http:Http){
    this._authUrl = `${Settings.API_URL}/auth`; 
    
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }
  
  authenticateGuestUser():Observable<string>{
    return this.authenticateUser('guest@guest.com', 'password');
  }
  
  authenticateUser(email:string, password:string):Observable<string>{
    
    return this._http.post(
      this._authUrl, 
      JSON.stringify({email:email, password:password}),
      {headers: this._headers}
    )
    .map(res => <string> res.json());
  }
}