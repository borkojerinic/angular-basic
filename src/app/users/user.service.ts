import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UsersResponse } from './users-response';
import { IUser, SingleUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //#region Class properties

  public userUrl: string = 'http://dev.qposoft.com:4082/api/users';
  public queryParams: string = `?pageSize=10&page=0`;

  //#endregion

  constructor(
    private http: HttpClient
  ) { }

  //#region Functionality

  /**
   * 
   * Get users from server
   * 
   * @param pageSize 
   * @param pageIndex 
   * @param search 
   * @param orderBy 
   * @param direction
   *  
   * @returns Observable<UsersResponse> - array of users(IUser[]), Links and Meta 
   */
  public getUsers(pageSize: number, pageIndex: number, search: string, orderBy: string, direction: string): Observable<UsersResponse> {
    this.queryParams = `?pageSize=${pageSize}&page=${pageIndex + 1}&search=${search}&order=${orderBy}&direction=${direction}`;

    return this.http
      .get<UsersResponse>(this.userUrl + this.queryParams)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * 
   * Get filtered users from server
   * 
   * @param search string - input from FilterUserComponent
   * 
   * @returns Observable<UsersResponse> - array of users(IUser[]), Links and Meta
   */
  public filter(search: string): Observable<UsersResponse> {
    return this.http
      .get<UsersResponse>(this.userUrl + `${this.queryParams}&search=${search}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * 
   * Get one user from server 
   * 
   * @param id number - user id
   * 
   * @returns Observable<SingleUser> - single user(IUser)
   */
  public getUser(id: number): Observable<SingleUser> {
    return this.http
      .get<SingleUser>(this.userUrl + `/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * 
   * Update user on server
   * 
   * @param user IUser - user for update
   * @returns Observable<IUser>
   */
  public updateUser(user: IUser): Observable<IUser> {
    return this.http
      .put<IUser>(this.userUrl + `/${user.id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * 
   * Delete user from server
   * 
   * @param user IUser - user for deletion
   * 
   * @returns Observable<unknown> - response from server
   */
  public deleteUser(user: IUser): Observable<unknown> {
    return this.http.delete(this.userUrl + `/${user.id}`);
  }

  /**
   * 
   * Add new user on server
   * 
   * @param user IUser - new user
   *  
   * @returns Observable<unknown> - response from server
   */
  public addUser(user: IUser): Observable<unknown> {
    return this.http
      .post(this.userUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  //#endregion

  //#region Utilities

  /**
   * 
   * Throw error if response represent an error or failure
   * 
   * @param err HttpErrorResponse - A response that represents an error or failure
   * 
   * @returns 
   */

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  //#endregion
}
