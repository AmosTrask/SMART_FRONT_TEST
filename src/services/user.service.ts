import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../entities/user";
import {API_SERVER} from "../app/app.constants";
import {of} from 'rxjs/observable/of';
import {catchError} from "rxjs/operators";

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  /**
   * Get all users
   * @returns {Observable<User[]>}
   */
  getAllUsers(): Observable<User[]>{
    const url = `${API_SERVER.user}/all`;
    return this.http.get<User[]>(url)
      .pipe(catchError(this.handleError('getAllUsers', [])));
  }


  /**
   * Get the current user
   * @returns {Observable<User>}
   */
  getUser(): Observable<User>{
    const url = `${API_SERVER.user}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError<User>('getUser')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`); // log to console for the moment

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
