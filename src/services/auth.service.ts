import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map'

@Injectable()

export class AuthService {

  private status:any = {
    accessToken: null,
    tokenType: null,
    isLogged: false
  };

  setLogged(logged:boolean):boolean{
    this.status.isLogged = logged;
    localStorage.setItem('isLogged', logged.toString());
    return this.status.isLogged;
  };

  isLogged():boolean{
    if (!this.status.isLogged) {
      this.status.isLogged = localStorage.getItem('isLogged') == "true";
    }
    return this.status.isLogged;
  };

  setTokenType(type:string): string{
    this.status.tokenType = type;
    localStorage.setItem('tokenType', type);
    return this.status.tokenType;
  };

  getTokenType(): string{
    if (!this.status.tokenType || this.status.tokenType == null) {
      this.status.tokenType = localStorage.getItem('tokenType');
    }
    return this.status.tokenType;
  };

  setToken(token: string): string{
    this.status.accessToken = token;
    localStorage.setItem('token', token);
    return this.status.accessToken;
  };

  getToken(): string{
    if (!this.status.accessToken || typeof this.status.accessToken == null) {
      this.status.accessToken = localStorage.getItem('token');
    }
    return this.status.accessToken;
  };

  getHeaders(): Headers{
    if(this.isLogged()){
      return new Headers({
        'Authorization': this.getTokenType() + " " + this.getToken(),
        'Content-Type': 'application/json'
      });
    }
    else{
      return new Headers({
        'Content-Type': 'application/json'
      });
    }
  }

}
