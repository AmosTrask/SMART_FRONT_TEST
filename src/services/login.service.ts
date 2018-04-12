import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {LoginInfos} from "../Entity/loginInfos";
import {API_SERVER} from "../app/app.constants";
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import "rxjs/add/operator/do";
import {User} from '../Entity/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  login (loginInfos: LoginInfos): Observable<User> {
    const url = API_SERVER.auth;
    return this.http.post<User>(url, loginInfos, httpOptions)
      .do(res => this.setSession(res))
      .pipe(catchError(this.handleError<User>('login'))
      );
  }

  private setSession(authResult) {
    console.log(authResult.token);
    this.authService.setToken(authResult.token);
    this.authService.setTokenType('Bearer');
    this.authService.setLogged(true);
  }

  logout() {
    this.authService.setToken(null);
    this.authService.setTokenType(null);
    this.authService.setLogged(false);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console for the moment

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
